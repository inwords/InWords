package com.dreamproject.inwords.viewScenario.main;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface MainFragmentComponent extends AndroidInjector<MainFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<MainFragment>{}
}