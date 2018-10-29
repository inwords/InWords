package com.dreamproject.inwords.viewScenario.authorisation.login;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = LoginFragmentComponent.class)
public abstract class LoginModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract LoginFragment contributeYourActivityInjector();
}

