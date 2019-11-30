package ru.inwords.inwords.dagger

import dagger.Module
import dagger.Provides
import ru.inwords.inwords.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.training.data.TrainingRepository
import ru.inwords.inwords.training.data.TrainingRepositoryImpl
import ru.inwords.inwords.training.domain.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Singleton

@Module
class DataModule {

    @Provides
    @Singleton
    fun trainingInteractor(translationWordsInteractor: TranslationWordsInteractor,
                           trainingRepository: TrainingRepository): TrainingInteractor {
        return TrainingInteractor(translationWordsInteractor, trainingRepository)
    }

    @Provides
    fun trainingRepository(webRequestsManagerAuthorised: WebRequestsManagerAuthorised): TrainingRepository {
        return TrainingRepositoryImpl(webRequestsManagerAuthorised)
    }
}