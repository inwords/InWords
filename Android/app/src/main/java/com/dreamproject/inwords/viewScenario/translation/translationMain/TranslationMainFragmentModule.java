package com.dreamproject.inwords.viewScenario.translation.translationMain;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class TranslationMainFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */})
    abstract TranslationMainFragment contributeYourActivityInjector();
}

