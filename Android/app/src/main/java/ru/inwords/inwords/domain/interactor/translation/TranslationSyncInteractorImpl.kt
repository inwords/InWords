package ru.inwords.inwords.domain.interactor.translation

import android.util.Log
import io.reactivex.Completable
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.sync.TranslationSyncController
import javax.inject.Inject

class TranslationSyncInteractorImpl @Inject
internal constructor(private val syncController: TranslationSyncController) : TranslationSyncInteractor {

    override fun presyncOnStart(): Completable {
        return syncController.presyncOnStart()
                .subscribeOn(SchedulersFacade.io())
                .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
                .ignoreElement()
    }

    override fun trySyncAllReposWithCache(): Completable {
        return syncController.trySyncAllReposWithCache()
                .subscribeOn(SchedulersFacade.io())
    }

    override fun notifyDataChanged() = syncController.notifyDataChanged()
}
