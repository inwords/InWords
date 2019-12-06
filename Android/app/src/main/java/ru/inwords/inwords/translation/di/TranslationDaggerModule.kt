package ru.inwords.inwords.translation.di


import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.translation.presentation.add_edit_word.AddEditWordFragment
import ru.inwords.inwords.translation.presentation.translation_main.TranslationMainFragment

@Module
abstract class TranslationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun translationMainFragmentInjector(): TranslationMainFragment

    @ContributesAndroidInjector
    internal abstract fun addEditWordFragmentInjector(): AddEditWordFragment
}

