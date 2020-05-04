package ru.inwords.inwords.dagger

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Singleton

@Module
class DataModule {

    @Provides
    @Singleton
    fun policyInteractor(integrationDatabaseRepository: IntegrationDatabaseRepository): PolicyInteractor {
        return PolicyInteractor(integrationDatabaseRepository)
    }

    @Provides
    @Singleton
    fun trainingInteractor(
        translationWordsInteractor: TranslationWordsInteractor,
        translationWordsRemoteRepository: TranslationWordsRemoteRepository
    ): TrainingInteractor {
        return TrainingInteractor(translationWordsInteractor, translationWordsRemoteRepository)
    }
}