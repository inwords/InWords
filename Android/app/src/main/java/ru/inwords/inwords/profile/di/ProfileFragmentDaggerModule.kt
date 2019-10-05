package ru.inwords.inwords.profile.di


import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.profile.presentation.view.ProfileFragment

@Module
abstract class ProfileFragmentDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun profileFragmentInjector(): ProfileFragment
}

