package ru.inwords.inwords.presentation.view_scenario.home


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class HomeFragmentDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun mainFragmentInjector(): HomeFragment
}

