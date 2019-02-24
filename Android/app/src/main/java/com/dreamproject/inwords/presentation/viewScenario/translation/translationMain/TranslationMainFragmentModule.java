package com.dreamproject.inwords.presentation.viewScenario.translation.translationMain;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class TranslationMainFragmentModule {
    @ContributesAndroidInjector
    abstract TranslationMainFragment contributeYourActivityInjector();
}

