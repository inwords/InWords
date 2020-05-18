package ru.inwords.inwords.profile.di

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorised
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
        webRequestsManagerAuthorised: WebRequestsManagerAuthorised
    ): ProfileInteractor {
        val remoteRepository = UserRemoteRepository(webRequestsManagerAuthorised)
        val repository = UserCachingRepository(UserDatabaseRepository(database.userDao()), remoteRepository)

        return ProfileInteractor(repository)
    }

    @Provides
    @Singleton
    fun provideProfileViewModelFactory(profileInteractor: ProfileInteractor, authorisationInteractor: AuthorisationInteractor): ProfileViewModelFactory {
        return ProfileViewModelFactory(profileInteractor, authorisationInteractor)
    }
}