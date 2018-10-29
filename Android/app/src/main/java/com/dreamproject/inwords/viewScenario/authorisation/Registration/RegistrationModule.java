package com.dreamproject.inwords.viewScenario.authorisation.Registration;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = RegistrationFragmentComponent.class)
public abstract class RegistrationModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract RegistrationFragment contributeYourActivityInjector();
}

