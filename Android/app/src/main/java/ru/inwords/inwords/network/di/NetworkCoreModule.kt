package ru.inwords.inwords.network.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.core.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.network.AuthorisedRequestsManagerImpl
import ru.inwords.inwords.network.SessionHelper
import ru.inwords.inwords.network.grpc.TokenHeaderAttachingClientInterceptor
import javax.inject.Singleton

@Module
class NetworkCoreModule {
    @Provides
    @Singleton
    fun provideAuthorisedRequestsManager(
        sessionHelper: SessionHelper,
        nativeTokenHolder: NativeTokenHolder,
        errorDataToDomainMapper: ErrorDataToDomainMapper
    ): AuthorisedRequestsManager {
        return AuthorisedRequestsManagerImpl(sessionHelper, nativeTokenHolder, errorDataToDomainMapper)
    }

    @Provides
    @Singleton
    fun provideSessionHelper(): SessionHelper {
        return SessionHelper()
    }

    @Provides
    fun provideTokenHeaderAttachingClientInterceptor(nativeTokenHolder: NativeTokenHolder): TokenHeaderAttachingClientInterceptor {
        return TokenHeaderAttachingClientInterceptor(nativeTokenHolder)
    }
}