package ru.inwords.inwords.presentation.viewScenario.translation


import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.presentation.viewScenario.translation.addEditWord.AddEditWordFragment
import ru.inwords.inwords.presentation.viewScenario.translation.translationMain.TranslationMainFragment

@Module
abstract class TranslationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun translationMainFragmentInjector(): TranslationMainFragment

    @ContributesAndroidInjector
    internal abstract fun addEditWordFragmentInjector(): AddEditWordFragment
}

