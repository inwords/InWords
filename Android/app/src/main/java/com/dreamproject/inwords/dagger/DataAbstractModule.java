package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.model.authorisation.AuthorisationInteractor;
import com.dreamproject.inwords.model.authorisation.AuthorisationWebInteractor;

import javax.inject.Singleton;

import dagger.Binds;
import dagger.Module;

@Module
public interface DataAbstractModule {
    @Binds
    @Singleton
    // Singleton annotation isn't necessary (in this case since Application instance is unique)
    // but is here for convention.
    AuthorisationInteractor provideAuthorisationWebInteractor(AuthorisationWebInteractor interactor);
}
