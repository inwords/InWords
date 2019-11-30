package ru.inwords.inwords.home


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class HomeFragmentDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun mainFragmentInjector(): HomeFragment
}

