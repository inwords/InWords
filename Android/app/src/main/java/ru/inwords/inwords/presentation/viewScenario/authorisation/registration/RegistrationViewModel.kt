package ru.inwords.inwords.presentation.viewScenario.authorisation.registration

import io.reactivex.Completable
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModel

class RegistrationViewModel(authorisationInteractor: AuthorisationInteractor) : AuthorisationViewModel(authorisationInteractor) {
    override fun performAuthAction(userCredentials: UserCredentials): Completable {
        return authorisationInteractor.signUp(userCredentials)
    }
}