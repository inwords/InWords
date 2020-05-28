package ru.inwords.inwords.network.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.data.session.NativeTokenHolder
import ru.inwords.inwords.authorisation.data.session.SessionHelper
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.network.AuthorisedRequestsManagerImpl
import ru.inwords.inwords.network.grpc.TokenHeaderAttachingClientInterceptor
import javax.inject.Singleton

@Module
class NetworkCoreModule {
    @Provides
    @Singleton
    fun provideAuthorisedRequestsManager(sessionHelper: SessionHelper): AuthorisedRequestsManager {
        return AuthorisedRequestsManagerImpl(sessionHelper)
    }

    @Provides
    fun provideTokenHeaderAttachingClientInterceptor(nativeTokenHolder: NativeTokenHolder): TokenHeaderAttachingClientInterceptor {
        return TokenHeaderAttachingClientInterceptor(nativeTokenHolder)
    }
}