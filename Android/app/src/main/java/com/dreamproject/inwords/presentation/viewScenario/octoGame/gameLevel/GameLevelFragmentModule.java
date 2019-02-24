package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class GameLevelFragmentModule {
    @ContributesAndroidInjector
    abstract GameLevelFragment contributeYourActivityInjector();
}

