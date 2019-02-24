package com.dreamproject.inwords.presentation.viewScenario.authorisation.login;

import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Inject;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

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
            //noinspection unchecked
            return (T) new LoginViewModel(authorisationInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }

}
