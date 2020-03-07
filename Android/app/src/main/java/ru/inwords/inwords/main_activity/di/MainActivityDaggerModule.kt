package ru.inwords.inwords.main_activity.di

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.main_activity.presentation.MainActivity

@Module
abstract class MainActivityDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun mainActivityInjector(): MainActivity
}
