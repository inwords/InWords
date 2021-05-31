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
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationWebInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewModelFactory
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.network.NativeTokenHolder
import ru.inwords.inwords.network.SessionHelper
import ru.inwords.inwords.network.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.network.error_handler.ErrorProcessor
import javax.inject.Singleton

@Module
class AuthorisationModule {
    @Provides
    @Singleton
    fun authorisationWebInteractor(
        integrationInteractor: IntegrationInteractor, //TODO inverse control somhow
        sessionHelper: SessionHelper,
        nativeAuthInfo: NativeAuthInfo,
        nativeTokenHolder: NativeTokenHolder,
        lastAuthInfoProvider: LastAuthInfoProvider,
        signInWithGoogle: SignInWithGoogle,
        @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
        errorDataToDomainMapper: ErrorDataToDomainMapper
    ): AuthorisationInteractor {
        val authorisationRepository = AuthorisationRepositoryImpl(AuthenticatorGrpcService(managedChannel), nativeTokenHolder, errorDataToDomainMapper)
        val authenticatorTokenProvider = AuthenticatorTokenProvider(authorisationRepository, nativeAuthInfo, signInWithGoogle, lastAuthInfoProvider)

        return AuthorisationWebInteractor(
            authorisationRepository,
            integrationInteractor,
            sessionHelper,
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
    fun provideAuthorisationViewModelFactory(
        authorisationInteractor: AuthorisationInteractor,
        errorProcessor: ErrorProcessor,
        resourceManager: ResourceManager
    ): AuthorisationViewModelFactory {
        return AuthorisationViewModelFactory(authorisationInteractor, errorProcessor, resourceManager)
    }
}