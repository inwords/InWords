package com.dreamproject.inwords.viewScenario.authorisation.Registration;

import com.dreamproject.inwords.data.entity.UserCredentials;
import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.viewScenario.authorisation.AuthorisationViewModel;

import io.reactivex.Completable;

public class RegistrationViewModel extends AuthorisationViewModel {

    RegistrationViewModel(AuthorisationInteractor authorisationInteractor) {
        super(authorisationInteractor);
    }

    @Override
    protected Completable performAuthAction(UserCredentials userCredentials) {
        return authorisationInteractor.signUp(userCredentials);
    }
}