package ru.inwords.inwords.presentation.view_scenario.profile


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class ProfileFragmentDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun profileFragmentInjector(): ProfileFragment
}

