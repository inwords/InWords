package ru.inwords.inwords.translation.domain.interactor

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.translation.converter.WordTranslationValueConverter
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.sync.TranslationSyncController
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Inject

class TranslationWordsInteractorImpl @Inject
internal constructor(private val adapterHolder: WordTranslationDeferredAdapterHolder,
                     private val syncController: TranslationSyncController) : TranslationWordsInteractor {
    private val wordTranslationValueConverter = WordTranslationValueConverter()


    override fun addReplace(wordTranslation: WordTranslation): Completable {
        return addReplaceAll(listOf(wordTranslation))
    }

    override fun addReplaceAll(wordTranslations: List<WordTranslation>): Completable {
        return Single.fromCallable { wordTranslationValueConverter.convertList(wordTranslations) }
            .flatMapCompletable { adapterHolder.addReplaceAll(it) }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun remove(wordTranslation: WordTranslation): Completable {
        return removeAll(listOf(wordTranslation))
    }

    override fun removeAll(wordTranslations: List<WordTranslation>): Completable {
        return Single.fromCallable { wordTranslationValueConverter.convertList(wordTranslations) }
            .flatMapCompletable { adapterHolder.removeAll(it) }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun update(oldWord: WordTranslation, newWord: WordTranslation): Completable {
        return Completable.concatArray(remove(oldWord), addReplace(newWord))
    }

    override fun getAllWords(): Observable<List<WordTranslation>> {
        return adapterHolder.retrieveAll().map {
            wordTranslationValueConverter.reverseList((it as? Resource.Success)?.data ?: emptyList())
        }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun presyncOnStart(forceUpdate: Boolean): Completable {
        return syncController.presyncOnStart(forceUpdate)
            .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
            .subscribeOn(SchedulersFacade.io())
    }

    override fun tryUploadUpdatesToRemote(): Completable {
        return adapterHolder.tryUploadUpdatesToRemote()
    }

    override fun notifyDataChanged() = syncController.notifyDataChanged()

    override fun clearCache() = adapterHolder.clearCache()

    companion object {
        // Tag used for debugging/logging
        const val TAG = "TranslationWordsInteractorImpl"
    }
}
