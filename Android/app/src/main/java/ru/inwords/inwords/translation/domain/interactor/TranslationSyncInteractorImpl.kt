package ru.inwords.inwords.translation.domain.interactor

import android.util.Log
import io.reactivex.Completable
import ru.inwords.inwords.translation.data.sync.TranslationSyncController
import javax.inject.Inject

class TranslationSyncInteractorImpl @Inject
internal constructor(private val syncController: TranslationSyncController) : TranslationSyncInteractor {

    override fun presyncOnStart(): Completable {
        return syncController.presyncOnStart()
                .doOnError { Log.e(javaClass.simpleName, it.message.orEmpty()) }
                .ignoreElement()
    }

    override fun trySyncAllReposWithCache(): Completable {
        return syncController.trySyncRemoteReposWithLocal()
    }

    override fun notifyDataChanged() = syncController.notifyDataChanged()
}
