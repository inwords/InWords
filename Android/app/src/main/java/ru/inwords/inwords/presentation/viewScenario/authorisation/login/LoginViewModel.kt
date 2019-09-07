package ru.inwords.inwords.presentation.viewScenario.authorisation.login

import io.reactivex.Completable
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModel

class LoginViewModel(authorisationInteractor: AuthorisationInteractor) : AuthorisationViewModel(authorisationInteractor) {
    override fun performAuthAction(userCredentials: UserCredentials): Completable {
        return authorisationInteractor.signIn(userCredentials)
    }
}
