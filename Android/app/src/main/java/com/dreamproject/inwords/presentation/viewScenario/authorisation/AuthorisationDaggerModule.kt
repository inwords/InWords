package com.dreamproject.inwords.presentation.viewScenario.authorisation

import com.dreamproject.inwords.presentation.viewScenario.authorisation.login.LoginFragment
import com.dreamproject.inwords.presentation.viewScenario.authorisation.registration.RegistrationFragment
import dagger.Module
import dagger.android.ContributesAndroidInjector

@Module
abstract class AuthorisationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun loginFragmentInjector(): LoginFragment

    @ContributesAndroidInjector
    internal abstract fun registrationFragmentInjector(): RegistrationFragment
}
