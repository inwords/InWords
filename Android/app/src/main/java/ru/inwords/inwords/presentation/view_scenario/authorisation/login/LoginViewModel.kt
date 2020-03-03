package ru.inwords.inwords.presentation.view_scenario.authorisation.login

import io.reactivex.Completable
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.view_scenario.authorisation.AuthorisationViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class LoginViewModel(authorisationInteractor: AuthorisationInteractor) : AuthorisationViewModel(authorisationInteractor) {
    override fun performAuthAction(userCredentials: UserCredentials): Completable {
        return authorisationInteractor.signIn(userCredentials)
    }
}