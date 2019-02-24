package com.dreamproject.inwords.presentation.viewScenario.main;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class MainFragmentModule {
    @ContributesAndroidInjector
    abstract MainFragment contributeYourActivityInjector();
}

