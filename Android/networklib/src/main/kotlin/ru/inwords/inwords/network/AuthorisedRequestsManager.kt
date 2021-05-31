package ru.inwords.inwords.network

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.network.error_handler.ErrorDataToDomainMapper

interface AuthorisedRequestsManager {
    fun notifyAuthStateChanged(authorised: Boolean)
    fun <T : Any> wrapRequest(request: Single<T>): Single<T>
    fun wrapRequest(request: Completable): Completable
}

class AuthorisedRequestsManagerImpl(
    private val sessionHelper: SessionHelper,
    private val nativeTokenHolder: NativeTokenHolder,
    private val errorDataToDomainMapper: ErrorDataToDomainMapper
) : AuthorisedRequestsManager {

    override fun notifyAuthStateChanged(authorised: Boolean) {
        sessionHelper.notifyAuthStateChanged(authorised)
    }

    override fun <T : Any> wrapRequest(request: Single<T>): Single<T> {
        return sessionHelper.valve()
            .flatMap { request }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun wrapRequest(request: Completable): Completable {
        return sessionHelper.valve()
            .flatMapCompletable { request }
            .interceptError()
            .subscribeOn(SchedulersFacade.io())
    }

    private fun <T : Any> Single<T>.interceptError(): Single<T> {
        return onErrorResumeNext { throwable ->
            val mappedThrowable = errorDataToDomainMapper.processThrowable(throwable)
            sessionHelper.registerPossibleAuthError(mappedThrowable)

            if (sessionHelper.registerPossibleAuthError(mappedThrowable)) {
                nativeTokenHolder.setUnauthorisedToken() //TODO this has no sense in real
            }

            Single.error(mappedThrowable)
        }
    }

    private fun Completable.interceptError(): Completable {
        return onErrorResumeNext { throwable ->
            val mappedThrowable = errorDataToDomainMapper.processThrowable(throwable)
            sessionHelper.registerPossibleAuthError(mappedThrowable)
            Completable.error(mappedThrowable)
        }
    }
}