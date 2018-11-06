package com.dreamproject.inwords.viewScenario.translation.addEditWord;

import dagger.Subcomponent;
import dagger.android.AndroidInjector;

@Subcomponent
public interface AddEditWordFragmentComponent extends AndroidInjector<AddEditWordFragment> {
    @Subcomponent.Builder
    abstract class Builder extends AndroidInjector.Builder<AddEditWordFragment> {
    }
}