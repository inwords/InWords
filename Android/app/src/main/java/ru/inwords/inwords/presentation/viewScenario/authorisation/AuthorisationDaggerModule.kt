package ru.inwords.inwords.presentation.viewScenario.authorisation

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.presentation.viewScenario.authorisation.login.LoginFragment
import ru.inwords.inwords.presentation.viewScenario.authorisation.registration.RegistrationFragment

@Module
abstract class AuthorisationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun loginFragmentInjector(): LoginFragment

    @ContributesAndroidInjector
    internal abstract fun registrationFragmentInjector(): RegistrationFragment
}
