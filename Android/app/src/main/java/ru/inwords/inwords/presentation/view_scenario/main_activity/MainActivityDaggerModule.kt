package ru.inwords.inwords.presentation.view_scenario.main_activity

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainActivityDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun mainActivityInjector(): MainActivity
}
