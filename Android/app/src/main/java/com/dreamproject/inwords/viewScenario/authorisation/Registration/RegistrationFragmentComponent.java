package com.dreamproject.inwords.viewScenario.authorisation.Registration;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface RegistrationFragmentComponent extends AndroidInjector<RegistrationFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<RegistrationFragment>{}
}