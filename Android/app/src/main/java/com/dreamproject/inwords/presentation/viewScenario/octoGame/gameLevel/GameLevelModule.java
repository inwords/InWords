package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class GameLevelModule {
    @ContributesAndroidInjector
    abstract GameLevelFragment contributeYourActivityInjector();
}

