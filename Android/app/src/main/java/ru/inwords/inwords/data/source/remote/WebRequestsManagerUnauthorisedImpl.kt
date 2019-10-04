package ru.inwords.inwords.data.source.remote

import android.util.Log
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.source.remote.session.AuthInfo
import ru.inwords.inwords.data.source.remote.session.SessionHelper
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.data.source.remote.session.validCredentials
import javax.inject.Inject

class WebRequestsManagerUnauthorisedImpl @Inject
internal constructor(private val apiServiceUnauthorised: ApiServiceUnauthorised,
                     private val sessionHelper: SessionHelper,
                     private val authInfo: AuthInfo) : WebRequestsManagerUnauthorised {

    private val authenticatedNotifierSubject = BehaviorSubject.create<Boolean>()

    override val authenticatedNotifier: Observable<Boolean> get() = authenticatedNotifierSubject

    override fun getToken(): Single<TokenResponse> {
        return authInfo.getCredentials().updateToken()
    }

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return Single.just(userCredentials)
            .updateToken()
            .flatMap { tokenResponse ->
                authInfo.setCredentials(userCredentials)
                    .map { tokenResponse }
            }
    }

    private fun Single<UserCredentials>.updateToken(): Single<TokenResponse> {
        return flatMap {
            if (it.validCredentials()) {
                apiServiceUnauthorised.getToken(it)
            } else {
                Single.just(AuthInfo.unauthorisedToken)
            }
        }
            .flatMap { setAuthToken(it) }
            .applyAuthSessionHelper()
            .subscribeOn(SchedulersFacade.io())
    }

    private fun setAuthToken(tokenResponse: TokenResponse): Single<TokenResponse> {
        return Single.fromCallable {
            this.authInfo.tokenResponse = tokenResponse

            authenticatedNotifierSubject.onNext(!authInfo.isNoToken)

            tokenResponse
        }
    }

    override fun registerUser(userCredentials: UserCredentials): Single<TokenResponse> {
        return apiServiceUnauthorised.registerUser(userCredentials)
            .applyAuthSessionHelper()
            .zipWith(authInfo.setCredentials(userCredentials),
                BiFunction<TokenResponse, UserCredentials, TokenResponse> { tokenResponse, u -> tokenResponse })
            .subscribeOn(Schedulers.io())
    }

    override fun ttsSynthesize(request: TtsSynthesizeRequest, googleServicesApiKey: String): Single<String> { //TODO
        return apiServiceUnauthorised.ttsSynthesize(googleServicesApiKey, request)
            .map { it.audioContent }
    }

    private fun Single<TokenResponse>.applyAuthSessionHelper(): Single<TokenResponse> {
        return doOnSuccess { sessionHelper.resetThreshold() }
            .onErrorResumeNext { throwable ->
                Log.e(javaClass.simpleName, throwable.message.orEmpty())

                if (sessionHelper.interceptAuthError(throwable)) {
                    setAuthToken(AuthInfo.unauthorisedToken)
                } else {
                    setAuthToken(AuthInfo.errorToken)
                }
                    .flatMap { Single.error<TokenResponse>(throwable) }
            }
            .flatMap { setAuthToken(it) }
    }
}
