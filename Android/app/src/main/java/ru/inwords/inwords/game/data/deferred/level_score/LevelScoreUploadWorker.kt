package ru.inwords.inwords.game.data.deferred.level_score

import android.content.Context
import android.util.Log
import androidx.work.RxWorker
import androidx.work.WorkerParameters
import io.reactivex.Single
import ru.inwords.inwords.App
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationWebInteractor
import javax.inject.Inject

class LevelScoreUploadWorker(context: Context, workerParams: WorkerParameters) : RxWorker(context, workerParams) {
    @Inject
    internal lateinit var levelScoreDeferredUploaderHolder: LevelScoreDeferredUploaderHolder

    @Inject
    internal lateinit var authorisationInteractor: AuthorisationWebInteractor

    override fun createWork(): Single<Result> {
        Log.d(javaClass.simpleName, "createWork called")
        App.appComponent.inject(this)

        return authorisationInteractor.trySignInExistingAccount()
            .andThen(levelScoreDeferredUploaderHolder.tryUploadDataToRemote())
            .doOnSubscribe { Log.d(javaClass.simpleName, "work started") }
            .doOnSuccess { Log.d(javaClass.simpleName, "work succeed") }
            .doOnError { Log.d(javaClass.simpleName, "work error") }
            .map { Result.success() }
            .onErrorReturnItem(Result.retry())
    }
}