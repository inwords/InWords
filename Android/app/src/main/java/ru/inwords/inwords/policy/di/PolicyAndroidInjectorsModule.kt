package ru.inwords.inwords.policy.di


import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.policy.presentation.PolicyFragment

@Module
abstract class PolicyAndroidInjectorsModule {
    @ContributesAndroidInjector
    internal abstract fun policyFragmentInjector(): PolicyFragment
}

