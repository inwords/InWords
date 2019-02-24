package com.dreamproject.inwords.presentation.viewScenario.octoGame;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class GameLevelsFragmentModule {
    @ContributesAndroidInjector
    abstract GameLevelsFragment contributeYourActivityInjector();
}

