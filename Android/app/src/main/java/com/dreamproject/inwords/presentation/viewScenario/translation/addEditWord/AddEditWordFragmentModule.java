package com.dreamproject.inwords.presentation.viewScenario.translation.addEditWord;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class AddEditWordFragmentModule {
    @ContributesAndroidInjector
    abstract AddEditWordFragment contributeYourActivityInjector();
}

