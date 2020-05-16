package ru.inwords.inwords.dagger

import android.content.SharedPreferences
import com.google.gson.Gson
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.core.property.SharedPrefsCache
import ru.inwords.inwords.dagger.annotations.Common
import ru.inwords.inwords.data.repository.integration.IntegrationDatabaseRepository
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.repository.TrainingRepository
import ru.inwords.inwords.translation.data.repository.TrainingRepositoryImpl
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.model.WordTranslation
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
    fun trainingInteractor(trainingRepository: TrainingRepository): TrainingInteractor {
        return TrainingInteractor(trainingRepository)
    }

    @Provides
    @Singleton
    fun trainingRepository(
        translationWordsRemoteRepository: TranslationWordsRemoteRepository,
        adapterHolder: WordTranslationDeferredAdapterHolder,
        @Common preferences: SharedPreferences,
        gson: Gson
    ): TrainingRepository {
        val trainingCache = SharedPrefsCache.create<List<WordTranslation>>("wordsForTraining", preferences, gson)

        return TrainingRepositoryImpl(translationWordsRemoteRepository, adapterHolder, trainingCache)
    }
}