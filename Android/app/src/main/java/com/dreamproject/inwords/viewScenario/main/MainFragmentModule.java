package com.dreamproject.inwords.viewScenario.main;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class MainFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */ })
    abstract MainFragment contributeYourActivityInjector();
}

