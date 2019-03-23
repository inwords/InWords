package com.dreamproject.inwords.domain.interactor.authorisation

import com.dreamproject.inwords.data.dto.UserCredentials
import com.dreamproject.inwords.data.source.webService.AuthenticationError
import com.dreamproject.inwords.data.source.webService.WebRequestsManager
import com.dreamproject.inwords.data.source.webService.session.TokenResponse
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor
import com.dreamproject.inwords.domain.util.getErrorMessage
import io.reactivex.Completable
import io.reactivex.Single
import retrofit2.HttpException
import java.net.SocketTimeoutException
import java.net.UnknownHostException
import javax.inject.Inject

class AuthorisationWebInteractor @Inject
internal constructor(private val webRequestsManager: WebRequestsManager,
                     private val translationSyncInteractor: TranslationSyncInteractor,
                     private val profileInteractor: ProfileInteractor) : AuthorisationInteractor {

    override fun signIn(userCredentials: UserCredentials): Completable {
        return applyCheckAuthToken(webRequestsManager.getToken(userCredentials))
    }

    override fun signUp(userCredentials: UserCredentials): Completable {
        return applyCheckAuthToken(webRequestsManager.registerUser(userCredentials))
    }

    private fun applyCheckAuthToken(authTokenSingle: Single<TokenResponse>): Completable {
        return authTokenSingle
                .onErrorResumeNext { e ->
                    e.printStackTrace()

                    val t = when (e) {
                        is HttpException -> AuthenticationError(getErrorMessage(e))
                        is UnknownHostException, is SocketTimeoutException -> RuntimeException("Network troubles")
                        else -> RuntimeException(e.message)
                    }

                    Single.error(t)
                }
                .flatMapCompletable { tokenResponse ->
                    if (tokenResponse.isValid) {
                        Completable.mergeDelayError(listOf(
                                profileInteractor.getAuthorisedUser(true)
                                        .firstOrError()
                                        .ignoreElement(),
                                translationSyncInteractor.presyncOnStart() //TODO may another order with trySync
                                        .andThen(translationSyncInteractor.trySyncAllReposWithCache())
                        ))
                                .onErrorComplete()
                    } else {
                        Completable.error(RuntimeException("unhandled")) //TODO think
                    }
                }
    }
}
