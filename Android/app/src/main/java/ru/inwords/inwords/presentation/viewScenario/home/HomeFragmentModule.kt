package ru.inwords.inwords.presentation.viewScenario.home


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class HomeFragmentModule {
    @ContributesAndroidInjector
    internal abstract fun mainFragmentInjector(): HomeFragment
}

