package ru.inwords.inwords.domain.interactor.authorisation

import io.reactivex.Completable
import ru.inwords.inwords.data.dto.UserCredentials

interface AuthorisationInteractor {
    fun trySignInExistingAccount(): Completable

    fun signIn(userCredentials: UserCredentials): Completable

    fun signUp(userCredentials: UserCredentials): Completable
}
