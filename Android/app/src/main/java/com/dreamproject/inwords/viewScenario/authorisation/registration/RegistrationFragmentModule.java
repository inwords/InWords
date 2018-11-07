package com.dreamproject.inwords.viewScenario.authorisation.registration;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = RegistrationFragmentComponent.class)
public abstract class RegistrationFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract RegistrationFragment contributeYourActivityInjector();
}

