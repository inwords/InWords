package ru.inwords.inwords.presentation.view_scenario.authorisation

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.presentation.view_scenario.authorisation.login.LoginFragment
import ru.inwords.inwords.presentation.view_scenario.authorisation.registration.RegistrationFragment

@Module
abstract class AuthorisationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun loginFragmentInjector(): LoginFragment

    @ContributesAndroidInjector
    internal abstract fun registrationFragmentInjector(): RegistrationFragment
}
