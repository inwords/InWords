package ru.inwords.inwords.authorisation.domain.interactor

import io.reactivex.Completable
import ru.inwords.inwords.profile.data.bean.UserCredentials

interface AuthorisationInteractor {
    fun trySignInExistingAccount(): Completable

    fun signIn(userCredentials: UserCredentials): Completable

    fun signUp(userCredentials: UserCredentials): Completable
}
