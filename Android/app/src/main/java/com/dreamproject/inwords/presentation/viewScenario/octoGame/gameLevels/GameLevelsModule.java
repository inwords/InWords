package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class GameLevelsModule {
    @ContributesAndroidInjector
    abstract GameLevelsFragment contributeYourActivityInjector();
}

