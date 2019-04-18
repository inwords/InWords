package com.dreamproject.inwords.presentation.viewScenario.main


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainFragmentModule {
    @ContributesAndroidInjector
    internal abstract fun mainFragmentInjector(): MainFragment
}

