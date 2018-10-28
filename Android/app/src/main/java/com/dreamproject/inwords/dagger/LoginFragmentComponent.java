package com.dreamproject.inwords.dagger;

import com.dreamproject.inwords.viewScenario.authorisation.login.LoginFragment;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface LoginFragmentComponent extends AndroidInjector<LoginFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<LoginFragment>{}
}