package ru.inwords.inwords.domain.interactor.authorisation

import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.HttpException
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.source.webService.AuthenticationException
import ru.inwords.inwords.data.source.webService.WebRequestsManager
import ru.inwords.inwords.data.source.webService.session.TokenResponse
import ru.inwords.inwords.domain.IntegrationInteractor
import ru.inwords.inwords.domain.util.getErrorMessage
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.inject.Inject

class AuthorisationWebInteractor @Inject
internal constructor(private val webRequestsManager: WebRequestsManager,
                     private val integrationInteractor: IntegrationInteractor) : AuthorisationInteractor {

    override fun signIn(userCredentials: UserCredentials): Completable {
        return webRequestsManager.getToken(userCredentials).interceptError().checkAuthToken()
    }

    override fun signUp(userCredentials: UserCredentials): Completable {
        return webRequestsManager.registerUser(userCredentials).interceptError().checkAuthToken()
    }

    private fun Single<TokenResponse>.interceptError(): Single<TokenResponse> {
        return onErrorResumeNext { e ->
            e.printStackTrace()

            val t = when (e) {
                is HttpException -> AuthenticationException(getErrorMessage(e), e.code())
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
