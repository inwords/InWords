package ru.inwords.inwords.authorisation.domain.interactor

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.HttpException
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle.GoogleSignedInData
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.getErrorMessage
import ru.inwords.inwords.data.source.remote.*
import ru.inwords.inwords.data.source.remote.session.LastAuthInfoProvider
import ru.inwords.inwords.data.source.remote.session.LastAuthInfoProvider.AuthMethod.*
import ru.inwords.inwords.data.source.remote.session.NativeAuthInfo
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.data.source.remote.session.requireCredentials
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.profile.data.bean.UserCredentials
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.inject.Inject

class AuthorisationWebInteractor @Inject internal constructor(
    private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised,
    private val webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised,
    private val integrationInteractor: IntegrationInteractor,
    private val nativeAuthInfo: NativeAuthInfo,
    private val lastAuthInfoProvider: LastAuthInfoProvider,
    private val authenticatorTokenProvider: AuthenticatorTokenProvider,
    private val signInWithGoogle: SignInWithGoogle
) : AuthorisationInteractor {

    override fun trySignInExistingAccount(): Completable {
        return authenticatorTokenProvider.getTokenSilently()
            .doOnSuccess { nativeAuthInfo.setCredentials(UserCredentials()) }
            .interceptError()
            .checkAuthToken()
    }

    override fun signInGoogleAccount(googleSignedInData: GoogleSignedInData): Completable {
        val userId = googleSignedInData.userId
        val idToken = googleSignedInData.idToken

        return webRequestsManagerUnauthorised.getTokenGoogle(idToken)
            .doOnSuccess {
                lastAuthInfoProvider.setAuthMethod(GOOGLE)
                nativeAuthInfo.setCredentials(UserCredentials())
            }
            .detectNewUser(idToken)
            .saveUserId(userId)
            .interceptError()
            .checkAuthToken()
    }

    override fun signIn(userCredentials: UserCredentials): Completable {
        return Single.fromCallable { userCredentials.requireCredentials() }
            .flatMap { webRequestsManagerUnauthorised.getToken(userCredentials) }
            .doOnSuccess { lastAuthInfoProvider.setAuthMethod(NATIVE) }
            .saveNativeCredentials(userCredentials)
            .detectNewUser(userCredentials.email)
            .saveUserId(userCredentials.email)
            .interceptError()
            .checkAuthToken()
    }

    override fun signUp(userCredentials: UserCredentials): Completable {
        return webRequestsManagerUnauthorised.registerUser(userCredentials)
            .doOnSuccess { lastAuthInfoProvider.setAuthMethod(NATIVE) }
            .saveNativeCredentials(userCredentials)
            .detectNewUser(userCredentials.email)
            .saveUserId(userCredentials.email)
            .interceptError()
            .checkAuthToken()
    }

    override fun getLastAuthMethod(): Single<LastAuthInfoProvider.AuthMethod> {
        return Single.fromCallable { lastAuthInfoProvider.getAuthMethod() }
    }

    override fun logout(): Completable {
        return Single.fromCallable { lastAuthInfoProvider.getAuthMethod() }
            .flatMapCompletable {
                Completable.defer { //to make this operation atomic
                    when (it) {
                        NONE -> {
                            Completable.complete()
                        }
                        NATIVE -> {
                            integrationInteractor.logout()
                                .subscribeOn(SchedulersFacade.io())
                                .doOnComplete { nativeAuthInfo.setCredentials(UserCredentials()) }
                        }
                        GOOGLE -> {
                            signInWithGoogle.revokeAccess()
                                .andThen(
                                    integrationInteractor.logout()
                                        .subscribeOn(SchedulersFacade.io()) //do not remove. strange behaviour
                                )
                        }
                    }.doOnComplete {
                        webRequestsManagerUnauthorised.invalidateToken()
                        lastAuthInfoProvider.setAuthMethod(NONE)
                    }
                }
            }

    }

    private fun Single<TokenResponse>.detectNewUser(newUserId: String): Single<TokenResponse> {
        return lastAuthInfoProvider.getUserId()
            .onErrorResumeNext {  //skip first start exception
                Log.d(TAG, "detectNewUser onError: ${it.message.orEmpty()}")
                if (it is AuthenticationException && it.exceptionType == AuthExceptionType.NO_CREDENTIALS) {
                    Single.just("")
                } else {
                    Single.error(it)
                }
            }
            .flatMap {
                Log.d(TAG, "detectNewUser old user: $it. new user: $newUserId")
                if (it == newUserId || it.isEmpty() || newUserId.isEmpty()) { //TODO care: its for not clearing data if its first login
                    this
                } else {
                    flatMap { tokenResponse ->
                        integrationInteractor.getOnNewUserCallback()
                            .andThen(Single.just(tokenResponse))
                    }
                }
            }
    }

    private fun Single<TokenResponse>.interceptError(): Single<TokenResponse> {
        return onErrorResumeNext { e ->
            Log.e(TAG, e.message.orEmpty())

            val t = when (e) {
                is HttpException -> AuthenticationException(getErrorMessage(e), AuthExceptionType.UNHANDLED) //TODO use code
                is UnknownHostException, is SocketTimeoutException -> RuntimeException("Network troubles")
                else -> RuntimeException(e.message)
            }

            Single.error(t)
        }
            .doFinally {
                webRequestsManagerAuthorised.notifyAuthStateChanged(!webRequestsManagerUnauthorised.isUnauthorised())
            }
    }

    private fun Single<TokenResponse>.checkAuthToken(): Completable {
        return flatMapCompletable { tokenResponse ->
            if (tokenResponse.isValid) {
                integrationInteractor.getOnAuthCallback()
            } else {
                Completable.error(RuntimeException("unhandled")) //TODO think
            }
        }
    }

    private fun Single<TokenResponse>.saveNativeCredentials(userCredentials: UserCredentials): Single<TokenResponse> {
        return doOnSuccess { nativeAuthInfo.setCredentials(userCredentials) }
    }

    private fun Single<TokenResponse>.saveUserId(userId: String): Single<TokenResponse> {
        return doOnSuccess { lastAuthInfoProvider.setUserId(userId) }
    }

    companion object {
        const val TAG = "AuthorisationWebInterac"
    }
}
