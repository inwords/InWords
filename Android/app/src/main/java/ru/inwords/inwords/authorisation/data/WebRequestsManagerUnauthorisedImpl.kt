package ru.inwords.inwords.authorisation.data

import android.util.Log
import io.reactivex.Single
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.authorisation.data.grpc.AuthenticatorGrpcService
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder.Companion.noToken
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.authorisation.data.session.TokenResponse
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.profile.data.bean.UserCredentials
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeRequest
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class WebRequestsManagerUnauthorisedImpl @Inject internal constructor(
    private val apiServiceUnauthorised: ApiServiceUnauthorised,
    private val sessionHelper: SessionHelper,
    private val authenticatorGrpcService: AuthenticatorGrpcService,
    private val nativeTokenHolder: NativeTokenHolder
) : WebRequestsManagerUnauthorised {

    override fun isUnauthorised() = nativeTokenHolder.isUnauthorised

    override fun invalidateToken() = nativeTokenHolder.setAuthToken(noToken)

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return authenticatorGrpcService.getToken(userCredentials)
            .flatMap { setAuthToken(it) }
            .applyAuthSessionHelper()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getTokenGoogle(tokenId: String): Single<TokenResponse> {
        return authenticatorGrpcService.getTokenOauth(tokenId, "google")
            .flatMap { setAuthToken(it) }
            .applyAuthSessionHelper()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun registerUser(userCredentials: UserCredentials): Single<TokenResponse> {
        return authenticatorGrpcService.register(userCredentials)
            .applyAuthSessionHelper()
            .subscribeOn(Schedulers.io())
    }

    override fun ttsSynthesize(request: TtsSynthesizeRequest, googleServicesApiKey: String): Single<String> { //TODO
        return apiServiceUnauthorised.ttsSynthesize(googleServicesApiKey, request)
            .map { it.audioContent }
    }

    private fun setAuthToken(tokenResponse: TokenResponse): Single<TokenResponse> {
        return Single.fromCallable {
            nativeTokenHolder.setAuthToken(tokenResponse)

            tokenResponse
        }
    }

    private fun Single<TokenResponse>.applyAuthSessionHelper(): Single<TokenResponse> {
        return doOnSuccess { sessionHelper.resetThreshold() }
            .onErrorResumeNext { throwable ->
                Log.e(TAG, throwable.message.orEmpty())

                if (sessionHelper.interceptAuthError(throwable)) {
                    setAuthToken(NativeTokenHolder.unauthorisedToken) //TODO this has no sense in real
                        .flatMap { Single.error<TokenResponse>(throwable) }
                } else {
                    Single.error<TokenResponse>(throwable)
                }
            }
            .flatMap { setAuthToken(it) }
    }

    companion object {
        const val TAG = "WebRequestsMgrUnauth"
    }
}
