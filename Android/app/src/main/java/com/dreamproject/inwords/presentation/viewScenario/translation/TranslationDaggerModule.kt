package com.dreamproject.inwords.presentation.viewScenario.translation


import com.dreamproject.inwords.presentation.viewScenario.translation.addEditWord.AddEditWordFragment
import com.dreamproject.inwords.presentation.viewScenario.translation.translationMain.TranslationMainFragment

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class TranslationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun translationMainFragmentInjector(): TranslationMainFragment

    @ContributesAndroidInjector
    internal abstract fun addEditWordFragmentInjector(): AddEditWordFragment
}

