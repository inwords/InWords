package ru.inwords.inwords.presentation.viewScenario.authorisation.registration;

import io.reactivex.Completable;
import ru.inwords.inwords.data.dto.UserCredentials;
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor;
import ru.inwords.inwords.presentation.viewScenario.authorisation.AuthorisationViewModel;

public class RegistrationViewModel extends AuthorisationViewModel {

    public RegistrationViewModel(AuthorisationInteractor authorisationInteractor) {
        super(authorisationInteractor);
    }

    @Override
    protected Completable performAuthAction(UserCredentials userCredentials) {
        return authorisationInteractor.signUp(userCredentials);
    }
}