package com.dreamproject.inwords.presentation.viewScenario.authorisation.login;

import com.dreamproject.inwords.data.dto.UserCredentials;
import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.presentation.viewScenario.authorisation.AuthorisationViewModel;

import io.reactivex.Completable;

public class LoginViewModel extends AuthorisationViewModel {

    public LoginViewModel(AuthorisationInteractor authorisationInteractor) {
        super(authorisationInteractor);
    }

    @Override
    protected Completable performAuthAction(UserCredentials userCredentials) {
        return authorisationInteractor.signIn(userCredentials);
    }
}
