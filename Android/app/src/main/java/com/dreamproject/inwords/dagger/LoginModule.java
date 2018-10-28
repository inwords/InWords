package com.dreamproject.inwords.dagger;


import com.dreamproject.inwords.viewScenario.authorisation.login.LoginFragment;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = LoginFragmentComponent.class)
abstract class LoginModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract LoginFragment contributeYourActivityInjector();
}

