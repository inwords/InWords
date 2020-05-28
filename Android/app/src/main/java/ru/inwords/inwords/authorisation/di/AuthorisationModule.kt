package ru.inwords.inwords.authorisation.di

import android.content.Context
import android.content.SharedPreferences
import dagger.Lazy
import dagger.Module
import dagger.Provides
import io.grpc.ManagedChannel
import ru.inwords.inwords.authorisation.data.AuthenticatorTokenProvider
import ru.inwords.inwords.authorisation.data.AuthorisationRepositoryImpl
import ru.inwords.inwords.authorisation.data.grpc.AuthenticatorGrpcService
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.NativeAuthInfo
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationWebInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.network.AuthorisedRequestsManager
import javax.inject.Singleton

@Module
class AuthorisationModule {
    @Provides
    @Singleton
    fun authorisationWebInteractor(
        authorisedRequestsManager: AuthorisedRequestsManager,
        integrationInteractor: IntegrationInteractor, //TODO inverse control somhow
        nativeAuthInfo: NativeAuthInfo,
        lastAuthInfoProvider: LastAuthInfoProvider,
        signInWithGoogle: SignInWithGoogle,
        sessionHelper: SessionHelper,
        @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
        nativeTokenHolder: NativeTokenHolder
    ): AuthorisationInteractor {
        val authorisationRepository = AuthorisationRepositoryImpl(sessionHelper, AuthenticatorGrpcService(managedChannel), nativeTokenHolder)
        val authenticatorTokenProvider = AuthenticatorTokenProvider(authorisationRepository, nativeAuthInfo, signInWithGoogle, lastAuthInfoProvider)

        return AuthorisationWebInteractor(
            authorisedRequestsManager,
            authorisationRepository,
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