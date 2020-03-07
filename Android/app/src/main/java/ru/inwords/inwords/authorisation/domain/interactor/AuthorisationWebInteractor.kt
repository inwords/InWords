package ru.inwords.inwords.authorisation.domain.interactor

import android.annotation.SuppressLint
import android.util.Log
import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.HttpException
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.data.getErrorMessage
import ru.inwords.inwords.data.source.remote.AuthExceptionType
import ru.inwords.inwords.data.source.remote.AuthenticationException
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorised
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.profile.data.bean.UserCredentials
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.inject.Inject

class AuthorisationWebInteractor @Inject
internal constructor(
    private val webRequestsManagerAuthorised: WebRequestsManagerAuthorised,
    private val webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised,
    private val integrationInteractor: IntegrationInteractor,
    private val signInWithGoogle: SignInWithGoogle
) : AuthorisationInteractor {
    init {
        init() //bypass SuppressLint restrictions
    }

    @SuppressLint("CheckResult")
    private fun init() {
        webRequestsManagerUnauthorised.authenticatedNotifier.subscribe {
            webRequestsManagerAuthorised.notifyAuthStateChanged(it)
        }
    }

    override fun trySignInExistingAccount(): Completable {
        return webRequestsManagerUnauthorised.getToken()
            .interceptError()
            .checkAuthToken()
    }

    override fun signIn(userCredentials: UserCredentials): Completable {
        return webRequestsManagerUnauthorised.getToken(userCredentials)
            .detectNewUser(userCredentials.email)
            .interceptError()
            .checkAuthToken()
    }

    override fun signUp(userCredentials: UserCredentials): Completable {
        return webRequestsManagerUnauthorised.registerUser(userCredentials)
            .detectNewUser(userCredentials.email)
            .interceptError()
            .checkAuthToken()
    }

    private fun Single<TokenResponse>.detectNewUser(email: String): Single<TokenResponse> {
        return webRequestsManagerAuthorised.getUserEmail()
            .onErrorResumeNext {  //skip first start exception
                if (it is AuthenticationException && it.exceptionType == AuthExceptionType.NO_CREDENTIALS) {
                    Single.just("")
                } else {
                    Single.error(it)
                }
            }
            .flatMap {
                if (it == email || it.isEmpty() || email.isEmpty()) { //TODO care its for not clearing data if its first login
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
            Log.e(javaClass.simpleName, e.message.orEmpty())

            val t = when (e) {
                is HttpException -> AuthenticationException(getErrorMessage(e), AuthExceptionType.UNHANDLED) //TODO use code
                is UnknownHostException, is SocketTimeoutException -> RuntimeException("Network troubles")
                else -> RuntimeException(e.message)
            }

            Single.error(t)
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
}
