package com.dreamproject.inwords.viewScenario.octoGame;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface GameLevelsFragmentComponent extends AndroidInjector<GameLevelsFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<GameLevelsFragment>{}
}