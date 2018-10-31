package com.dreamproject.inwords.viewScenario.translation.translationMain;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface TranslationMainFragmentComponent extends AndroidInjector<TranslationMainFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<TranslationMainFragment>{}
}