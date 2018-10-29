package com.dreamproject.inwords.viewScenario.authorisation.login;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Inject;

public class LoginViewModelFactory implements ViewModelProvider.Factory {
    private final AuthorisationInteractor authorisationInteractor;

    @Inject
    LoginViewModelFactory(AuthorisationInteractor authorisationInteractor) {
        this.authorisationInteractor = authorisationInteractor;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(LoginViewModel.class)) {
            return (T) new LoginViewModel(authorisationInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
