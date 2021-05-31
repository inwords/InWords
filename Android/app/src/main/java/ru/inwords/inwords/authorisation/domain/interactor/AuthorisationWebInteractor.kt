package ru.inwords.inwords.authorisation.domain.interactor

import android.util.Log
import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.AuthenticatorTokenProvider
import ru.inwords.inwords.authorisation.data.AuthorisationRepository
import ru.inwords.inwords.authorisation.data.NeverAuthenticatedBeforeException
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider.AuthMethod.*
import ru.inwords.inwords.authorisation.data.session.NativeAuthInfo
import ru.inwords.inwords.authorisation.data.session.requireCredentials
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle.GoogleSignedInData
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.network.SessionHelper
import ru.inwords.inwords.network.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials
import kotlin.random.Random

class AuthorisationWebInteractor internal constructor(
    private val authorisationRepository: AuthorisationRepository,
    private val integrationInteractor: IntegrationInteractor,
    private val sessionHelper: SessionHelper,
    private val nativeAuthInfo: NativeAuthInfo,
    private val lastAuthInfoProvider: LastAuthInfoProvider,
    private val authenticatorTokenProvider: AuthenticatorTokenProvider,
    private val signInWithGoogle: SignInWithGoogle
) : AuthorisationInteractor {

    override fun trySignInExistingAccount(): Completable {
        return authenticatorTokenProvider.getTokenSilently()
            .notifyAuthStateChanged()
    }

    override fun signInGoogleAccount(googleSignedInData: GoogleSignedInData): Completable {
        val userId = googleSignedInData.userId
        val idToken = googleSignedInData.idToken

        return authorisationRepository.getTokenGoogle(idToken)
            .doOnSuccess {
                lastAuthInfoProvider.setAuthMethod(GOOGLE)
                nativeAuthInfo.setCredentials(UserCredentials())
            }
            .detectNewUser(idToken)
            .saveUserId(userId)
            .notifyAuthStateChanged()
    }

    override fun signIn(userCredentials: UserCredentials): Completable {
        return Single.fromCallable { userCredentials.requireCredentials() }
            .flatMap { authorisationRepository.getToken(userCredentials) }
            .doOnSuccess { lastAuthInfoProvider.setAuthMethod(NATIVE) }
            .saveNativeCredentials(userCredentials)
            .detectNewUser(userCredentials.email)
            .saveUserId(userCredentials.email)
            .notifyAuthStateChanged()
    }

    override fun signUp(userCredentials: UserCredentials): Completable {
        return signUpInternal(userCredentials, false)
    }

    override fun signInGuest(): Completable {
        val charPool: List<Char> = ('a'..'z') + ('A'..'Z') + ('0'..'9')

        val randomString = (1..14)
            .map { charPool[Random.nextInt(0, charPool.size)] }
            .joinToString("")

        val randomPassword = (1..16)
            .map { charPool[Random.nextInt(0, charPool.size)] }
            .joinToString("")

        return signUpInternal(
            UserCredentials(
                email = "inwords_$randomString@inwords",
                password = randomPassword
            ), true
        )
    }

    private fun signUpInternal(userCredentials: UserCredentials, isAnonymous: Boolean): Completable {
        return authorisationRepository.registerUser(userCredentials, isAnonymous)
            .doOnSuccess { lastAuthInfoProvider.setAuthMethod(NATIVE) }
            .saveNativeCredentials(userCredentials)
            .detectNewUser(userCredentials.email)
            .saveUserId(userCredentials.email)
            .notifyAuthStateChanged()
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
                        authorisationRepository.invalidateToken()
                        lastAuthInfoProvider.setAuthMethod(NONE)
                    }
                }
            }

    }

    private fun Single<TokenResponse>.detectNewUser(newUserId: String): Single<TokenResponse> {
        return lastAuthInfoProvider.getUserId()
            .onErrorResumeNext {  //skip first start exception
                Log.d(TAG, "detectNewUser onError: ${it.message.orEmpty()}")
                if (it is NeverAuthenticatedBeforeException) {
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

    private fun Single<TokenResponse>.notifyAuthStateChanged(): Completable {
        return doOnEvent { _, _ ->
            sessionHelper.notifyAuthStateChanged(!authorisationRepository.isUnauthorised())
        }
            .flatMapCompletable {
                if (authorisationRepository.tokenSeemsValid()) {
                    integrationInteractor.getOnAuthCallback()
                } else {
                    Completable.error(RuntimeException("### WATCH THIS unhandled WATCH THIS ###")) //TODO think
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
