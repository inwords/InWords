package ru.inwords.inwords.authorisation.domain.interactor

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle.GoogleSignedInData
import ru.inwords.inwords.data.source.remote.session.LastAuthInfoProvider.AuthMethod
import ru.inwords.inwords.profile.data.bean.UserCredentials

interface AuthorisationInteractor {
    fun signInGoogleAccount(googleSignedInData: GoogleSignedInData): Completable

    fun trySignInExistingAccount(): Completable
    fun signIn(userCredentials: UserCredentials): Completable
    fun signUp(userCredentials: UserCredentials): Completable

    fun getLastAuthMethod(): Single<AuthMethod>

    fun logout(): Completable
}
