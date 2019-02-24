package com.dreamproject.inwords.presentation.viewScenario.authorisation.registration;

import com.dreamproject.inwords.domain.interactor.authorisation.AuthorisationInteractor;

import javax.inject.Inject;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

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
            //noinspection unchecked
            return (T) new RegistrationViewModel(authorisationInteractor);
        }
        throw new IllegalArgumentException("Unknown ViewModel class");
    }
}
