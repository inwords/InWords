package ru.inwords.inwords.presentation.viewScenario.main_activity

import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class MainActivityDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun mainActivityInjector(): MainActivity
}
