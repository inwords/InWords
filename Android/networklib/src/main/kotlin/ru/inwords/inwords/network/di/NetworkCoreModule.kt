package ru.inwords.inwords.network.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.network.AuthorisedRequestsManagerImpl
import ru.inwords.inwords.network.NativeTokenHolder
import ru.inwords.inwords.network.SessionHelper
import ru.inwords.inwords.network.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.network.error_handler.ErrorProcessor
import ru.inwords.inwords.network.error_handler.ErrorProcessorImpl
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

    @Provides
    fun provideErrorHandler(resourceManager: ResourceManager): ErrorProcessor {
        return ErrorProcessorImpl(resourceManager)
    }

    @Provides
    fun provideErrorDataToDomainMapper(): ErrorDataToDomainMapper {
        return ErrorDataToDomainMapper()
    }

    @Provides
    @Singleton
    fun provideNativeTokenHolder(): NativeTokenHolder {
        return NativeTokenHolder()
    }
}