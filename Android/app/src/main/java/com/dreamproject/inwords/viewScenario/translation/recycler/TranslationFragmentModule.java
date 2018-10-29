package com.dreamproject.inwords.viewScenario.translation.recycler;


import com.dreamproject.inwords.viewScenario.translation.TranslationFragmentComponent;
import com.dreamproject.inwords.viewScenario.translation.TranslationMainFragment;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = TranslationFragmentComponent.class)
public abstract class TranslationFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract TranslationMainFragment contributeYourActivityInjector();
}

