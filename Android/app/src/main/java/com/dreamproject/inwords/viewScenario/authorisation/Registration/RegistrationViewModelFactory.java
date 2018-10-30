package com.dreamproject.inwords.viewScenario.authorisation.Registration;

import android.arch.lifecycle.ViewModel;
import android.arch.lifecycle.ViewModelProvider;
import android.support.annotation.NonNull;

import com.dreamproject.inwords.data.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Inject;

public class RegistrationViewModelFactory implements ViewModelProvider.Factory {
    private final AuthorisationInteractor authorisationInteractor;

    @Inject
    RegistrationViewModelFactory(AuthorisationInteractor authorisationInteractor) {
        this.authorisationInteractor = authorisationInteractor;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(RegistrationViewModel.class)) {
            return (T) new RegistrationViewModel(authorisationInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }
}
