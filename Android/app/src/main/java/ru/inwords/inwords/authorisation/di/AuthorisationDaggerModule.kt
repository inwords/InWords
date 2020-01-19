package ru.inwords.inwords.authorisation.di

import dagger.Module
import dagger.android.ContributesAndroidInjector
import ru.inwords.inwords.authorisation.presentation.login.LoginFragment
import ru.inwords.inwords.authorisation.presentation.registration.RegistrationFragment

@Module
abstract class AuthorisationDaggerModule {
    @ContributesAndroidInjector
    internal abstract fun loginFragmentInjector(): LoginFragment

    @ContributesAndroidInjector
    internal abstract fun registrationFragmentInjector(): RegistrationFragment
}
