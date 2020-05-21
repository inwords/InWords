package ru.inwords.inwords.translation.data.repository

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.core.property.SharedPrefsCache
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.resource.ResourceCachingProvider
import ru.inwords.inwords.translation.converter.WordTranslationValueConverter
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.domain.model.WordTranslation

class TrainingRepositoryImpl internal constructor(
    private val translationWordsRemoteRepository: TranslationWordsRemoteRepository,
    private val adapterHolder: WordTranslationDeferredAdapterHolder,
    private val wordsForTrainingCache: SharedPrefsCache<List<WordTranslation>>
) : TrainingRepository {

    private val wordTranslationValueConverter = WordTranslationValueConverter()

    private val trainingCachingProviderLocator = ResourceCachingProvider.Locator { createTrainingCachingProvider() }

    override fun getActualWordsForTraining(forceUpdate: Boolean) = trainingCachingProviderLocator.getDefault().observe(forceUpdate)

    override fun clearCache() {
        trainingCachingProviderLocator.clear()
        wordsForTrainingCache.invalidate().blockingAwait()
    }

    private fun obtainActualWordsForTraining(): List<WordTranslation> {
        val words = adapterHolder.retrieveAll().map {
            wordTranslationValueConverter.reverseList((it as? Resource.Success)?.data ?: emptyList())
        }.blockingFirst(emptyList())

        val idsForTraining = translationWordsRemoteRepository.trainingIds().blockingGet().toSet()

        val wordsForTrainingFiltered = words.filter { it.serverId in idsForTraining }

        return if (wordsForTrainingFiltered.size != idsForTraining.size || wordsForTrainingFiltered.isEmpty()) {
            Log.w(javaClass.simpleName, "wordsForTraining.size != idsForTraining")

            translationWordsRemoteRepository.trainingWords().blockingGet()
        } else {
            wordsForTrainingFiltered
        }
    }

    private fun createTrainingCachingProvider(): ResourceCachingProvider<List<WordTranslation>> {
        return ResourceCachingProvider(
            { data -> wordsForTrainingCache.set(data).andThen(Single.just(data)) },
            {
                wordsForTrainingCache.get().filter { it.isNotEmpty() }.toSingle()
            },
            {
                Single.fromCallable {
                    val wordsForTraining = obtainActualWordsForTraining()
                    require(wordsForTraining.isNotEmpty()) { "no words for training present" }
                    wordsForTraining
                }
            },
            prefetchFromDatabase = true
        )
    }

}