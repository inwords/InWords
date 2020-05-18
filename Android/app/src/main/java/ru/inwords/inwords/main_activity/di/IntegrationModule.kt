package ru.inwords.inwords.main_activity.di

import android.content.SharedPreferences
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.main_activity.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.main_activity.data.repository.integration.IntegrationDatabaseRepositoryImpl
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractorImpl
import ru.inwords.inwords.main_activity.presentation.IntegrationViewModelFactory
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Singleton

@Module
class IntegrationModule {
    @Provides
    @Singleton
    fun provideIntegrationInteractor(
        translationWordsInteractor: TranslationWordsInteractor,
        profileInteractor: ProfileInteractor,
        gameInteractor: GameInteractor,
        trainingInteractor: TrainingInteractor,
        integrationDatabaseRepository: IntegrationDatabaseRepository,
        @Common sharedPreferences: SharedPreferences
    ): IntegrationInteractor {
        return IntegrationInteractorImpl(
            translationWordsInteractor,
            profileInteractor,
            gameInteractor,
            trainingInteractor,
            integrationDatabaseRepository,
            sharedPreferences
        )
    }

    @Provides
    @Singleton
    fun provideIntegrationDatabaseRepository(database: AppRoomDatabase, @Common sharedPreferences: SharedPreferences): IntegrationDatabaseRepository {
        return IntegrationDatabaseRepositoryImpl(database, sharedPreferences)
    }

    @Provides
    fun provideIntegrationViewModelFactory(
        authorisationInteractor: AuthorisationInteractor,
        integrationInteractor: IntegrationInteractor
    ): IntegrationViewModelFactory {
        return IntegrationViewModelFactory(authorisationInteractor, integrationInteractor)
    }
}