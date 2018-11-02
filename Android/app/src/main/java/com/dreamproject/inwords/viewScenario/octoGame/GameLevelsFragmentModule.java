package com.dreamproject.inwords.viewScenario.octoGame;


import dagger.Module;
import dagger.android.ContributesAndroidInjector;

@Module(subcomponents = GameLevelsFragmentComponent.class)
public abstract class GameLevelsFragmentModule {
    @ContributesAndroidInjector(modules = { /* modules to install into the subcomponent */})
    abstract GameLevelsFragment contributeYourActivityInjector();
}

