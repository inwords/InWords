package ru.inwords.inwords.presentation.viewScenario.policy


import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class PolicyFragmentDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun policyFragmentInjector(): PolicyFragment
}

