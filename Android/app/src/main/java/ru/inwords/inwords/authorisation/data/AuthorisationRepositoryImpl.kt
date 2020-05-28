package ru.inwords.inwords.authorisation.data

import android.util.Log
import io.reactivex.Single
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.authorisation.data.grpc.AuthenticatorGrpcService
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder.Companion.noToken
import ru.inwords.inwords.authorisation.data.session.TokenResponse
import ru.inwords.inwords.core.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.profile.data.bean.UserCredentials

class AuthorisationRepositoryImpl internal constructor(
    private val authenticatorGrpcService: AuthenticatorGrpcService,
    private val nativeTokenHolder: NativeTokenHolder,
    private val errorDataToDomainMapper: ErrorDataToDomainMapper
) : AuthorisationRepository {

    override fun isUnauthorised() = nativeTokenHolder.isUnauthorised

    override fun invalidateToken() = nativeTokenHolder.setAuthToken(noToken)

    override fun getToken(userCredentials: UserCredentials): Single<TokenResponse> {
        return authenticatorGrpcService.getToken(userCredentials)
            .applyAuthSessionHelper()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun getTokenGoogle(tokenId: String): Single<TokenResponse> {
        return authenticatorGrpcService.getTokenOauth(tokenId, "google")
            .applyAuthSessionHelper()
            .subscribeOn(SchedulersFacade.io())
    }

    override fun registerUser(userCredentials: UserCredentials, isAnonymous: Boolean): Single<TokenResponse> {
        return authenticatorGrpcService.register(userCredentials, isAnonymous)
            .applyAuthSessionHelper()
            .subscribeOn(Schedulers.io())
    }

    private fun Single<TokenResponse>.applyAuthSessionHelper(): Single<TokenResponse> {
        return doOnSuccess { nativeTokenHolder.setAuthToken(it) }
            .onErrorResumeNext { throwable ->
                Log.e(TAG, throwable.message.orEmpty())
                val mappedThrowable = errorDataToDomainMapper.processThrowable(throwable)
                Single.error(mappedThrowable)
            }
    }

    companion object {
        const val TAG = "WebRequestsMgrUnauth"
    }
}
