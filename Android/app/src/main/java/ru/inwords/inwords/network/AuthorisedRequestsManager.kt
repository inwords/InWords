package ru.inwords.inwords.network

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.core.rxjava.ObservableTransformers
import ru.inwords.inwords.core.rxjava.SchedulersFacade

interface AuthorisedRequestsManager {
    fun notifyAuthStateChanged(authorised: Boolean)
    fun <T : Any> wrapRequest(request: Single<T>): Single<T>
    fun wrapRequest(request: Completable): Completable
}

class AuthorisedRequestsManagerImpl(
    private val sessionHelper: SessionHelper
) : AuthorisedRequestsManager {
    private val authenticatedNotifierSubject = BehaviorSubject.create<Boolean>()

    override fun notifyAuthStateChanged(authorised: Boolean) {
        if (authorised) {
            sessionHelper.resetThreshold()
        }
        authenticatedNotifierSubject.onNext(authorised)
    }

    override fun <T : Any> wrapRequest(request: Single<T>): Single<T> {
        return valve()
            .flatMap { request }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun wrapRequest(request: Completable): Completable {
        return valve()
            .flatMapCompletable { request }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    private fun valve(): Single<Unit> {
        return Observable.just(Unit)
            .doOnNext { sessionHelper.requireThreshold() }
            .compose(ObservableTransformers.valve(authenticatedNotifierSubject, false))
            .firstOrError()
    }

    private fun <T : Any> Single<T>.interceptError(): Single<T> {
        return doOnError { throwable -> sessionHelper.interceptAuthError(throwable) }
    }

    private fun Completable.interceptError(): Completable {
        return doOnError { throwable -> sessionHelper.interceptAuthError(throwable) }
    }
}