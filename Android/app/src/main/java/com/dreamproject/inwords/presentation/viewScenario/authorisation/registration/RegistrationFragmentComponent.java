package com.dreamproject.inwords.presentation.viewScenario.authorisation.registration;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface RegistrationFragmentComponent extends AndroidInjector<RegistrationFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<RegistrationFragment>{}
}