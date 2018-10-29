package com.dreamproject.inwords.viewScenario.translation;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface TranslationFragmentComponent extends AndroidInjector<TranslationMainFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<TranslationMainFragment>{}
}