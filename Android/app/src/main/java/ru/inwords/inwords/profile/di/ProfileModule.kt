package ru.inwords.inwords.profile.di

import dagger.Lazy
import dagger.Module
import dagger.Provides
import io.grpc.ManagedChannel
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.network.grpc.TokenHeaderAttachingClientInterceptor
import ru.inwords.inwords.profile.data.grpc.ProfileGrpcService
import ru.inwords.inwords.profile.data.repository.UserCachingRepository
import ru.inwords.inwords.profile.data.repository.UserDatabaseRepository
import ru.inwords.inwords.profile.data.repository.UserRemoteRepository
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.profile.presentation.ProfileViewModelFactory
import javax.inject.Singleton

@Module
class ProfileModule {
    @Provides
    @Singleton
    fun provideProfileInteractor(
        database: AppRoomDatabase,
        authorisedRequestsManager: AuthorisedRequestsManager,
        @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
        tokenHeaderAttachingClientInterceptor: TokenHeaderAttachingClientInterceptor
    ): ProfileInteractor {
        val remoteRepository = UserRemoteRepository(authorisedRequestsManager, ProfileGrpcService(managedChannel, tokenHeaderAttachingClientInterceptor))
        val repository = UserCachingRepository(UserDatabaseRepository(database.userDao()), remoteRepository)

        return ProfileInteractor(repository)
    }

    @Provides
    @Singleton
    fun provideProfileViewModelFactory(profileInteractor: ProfileInteractor, authorisationInteractor: AuthorisationInteractor): ProfileViewModelFactory {
        return ProfileViewModelFactory(profileInteractor, authorisationInteractor)
    }
}