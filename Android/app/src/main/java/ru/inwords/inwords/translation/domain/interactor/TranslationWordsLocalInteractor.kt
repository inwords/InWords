package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Completable
import ru.inwords.inwords.dagger.annotations.LocalRepository
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.bean.markRemoved
import ru.inwords.inwords.translation.data.translation.TranslationWordsLocalRepository
import javax.inject.Inject

class TranslationWordsLocalInteractor @Inject
internal constructor(@LocalRepository private val databaseRepository: TranslationWordsLocalRepository) : TranslationWordsRepositoryInteractor {
    override fun getList() = databaseRepository.getList()

    override fun add(wordTranslation: WordTranslation): Completable {
        return databaseRepository.addReplace(wordTranslation).ignoreElement()
    }

    override fun addAll(wordTranslations: List<WordTranslation>): Completable {
        return databaseRepository.addReplaceAll(wordTranslations).ignoreElement()
    }

    override fun markRemoved(wordTranslation: WordTranslation): Completable {
        val newWord = wordTranslation.markRemoved()

        return add(newWord)
    }

    override fun markRemovedAll(wordTranslations: List<WordTranslation>): Completable {
        val newList = wordTranslations.markRemoved()

        return addAll(newList)
    }

    override fun clearCache() = databaseRepository.clear()
}
