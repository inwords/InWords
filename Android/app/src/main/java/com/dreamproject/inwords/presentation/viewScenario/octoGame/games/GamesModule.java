package com.dreamproject.inwords.presentation.viewScenario.octoGame.games;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module
public abstract class GamesModule {
    @ContributesAndroidInjector
    abstract GamesFragment contributeYourActivityInjector();
}

