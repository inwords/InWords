package com.dreamproject.inwords.presentation.viewScenario.authorisation.login;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = LoginFragmentComponent.class)
public abstract class LoginFragmentModule {
    @ContributesAndroidInjector
    abstract LoginFragment contributeYourActivityInjector();
}

