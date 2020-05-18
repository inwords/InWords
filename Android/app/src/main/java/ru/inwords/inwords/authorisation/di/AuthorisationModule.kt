package ru.inwords.inwords.authorisation.di

import android.content.Context
import android.content.SharedPreferences
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.data.AuthenticatorTokenProvider
import ru.inwords.inwords.authorisation.data.WebRequestsManagerUnauthorised
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.NativeAuthInfo
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationWebInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import javax.inject.Singleton

@Module
class AuthorisationModule {
    @Provides
    @Singleton
    fun authorisationWebInteractor(
        webRequestsManagerAuthorised: WebRequestsManagerAuthorised,
        webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised,
        integrationInteractor: IntegrationInteractor,
        nativeAuthInfo: NativeAuthInfo,
        lastAuthInfoProvider: LastAuthInfoProvider,
        signInWithGoogle: SignInWithGoogle
    ): AuthorisationInteractor {
        val authenticatorTokenProvider = AuthenticatorTokenProvider(webRequestsManagerUnauthorised, nativeAuthInfo, signInWithGoogle, lastAuthInfoProvider)

        return AuthorisationWebInteractor(
            webRequestsManagerAuthorised,
            webRequestsManagerUnauthorised,
            integrationInteractor,
            nativeAuthInfo,
            lastAuthInfoProvider,
            authenticatorTokenProvider,
            signInWithGoogle
        )
    }

    @Provides
    @Singleton
    fun provideLastAuthInfoProvider(@Common sharedPreferences: SharedPreferences): LastAuthInfoProvider {
        return LastAuthInfoProvider(sharedPreferences)
    }

    @Provides
    @Singleton
    fun provideNativeAuthInfo(@Common sharedPreferences: SharedPreferences): NativeAuthInfo {
        return NativeAuthInfo(sharedPreferences)
    }

    @Provides
    @Singleton
    fun provideSignInWithGoogle(context: Context): SignInWithGoogle {
        return SignInWithGoogle(context)
    }

    @Provides
    @Singleton
    fun provideNativeTokenHolder(): NativeTokenHolder {
        return NativeTokenHolder()
    }

    @Provides
    fun provideAuthorisationViewModelFactory(
        authorisationInteractor: AuthorisationInteractor,
        resourceManager: ResourceManager
    ): AuthorisationViewModelFactory {
        return AuthorisationViewModelFactory(authorisationInteractor, resourceManager)
    }
}