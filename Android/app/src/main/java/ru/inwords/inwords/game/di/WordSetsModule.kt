package ru.inwords.inwords.game.di

import android.content.SharedPreferences
import com.google.gson.Gson
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.property.SharedPrefsCache
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderFactory
import ru.inwords.inwords.game.data.deferred.level_score.LevelScoreDeferredUploaderHolder
import ru.inwords.inwords.game.data.repository.GameGatewayController
import ru.inwords.inwords.game.data.repository.GameGatewayControllerImpl
import ru.inwords.inwords.game.data.repository.GameRemoteRepository
import ru.inwords.inwords.game.data.repository.custom_game.CustomGameCreator
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.data.repository.custom_game.LevelInfoGenerator
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractorImpl
import ru.inwords.inwords.game.presentation.WordsSetsViewModelFactory
import ru.inwords.inwords.main_activity.data.WorkManagerWrapper
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.data.source.remote.WebRequestsManagerAuthorised
import ru.inwords.inwords.main_activity.di.annotations.Common
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.repository.TrainingRepositoryImpl
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.model.WordTranslation
import javax.inject.Singleton

@Module(includes = [WordSetsAbstractModule::class])
class WordSetsModule {
    @Provides
    @Singleton
    fun provideTrainingInteractor(
        translationWordsRemoteRepository: TranslationWordsRemoteRepository,
        adapterHolder: WordTranslationDeferredAdapterHolder,
        @Common preferences: SharedPreferences,
        gson: Gson
    ): TrainingInteractor {
        val trainingCache = SharedPrefsCache.create<List<WordTranslation>>("wordsForTraining", preferences, gson)

        val repository = TrainingRepositoryImpl(translationWordsRemoteRepository, adapterHolder, trainingCache)

        return TrainingInteractor(repository)
    }

    @Provides
    @Singleton
    fun provideGameInteractor(
        gameGatewayController: GameGatewayController,
        translationWordsInteractor: TranslationWordsInteractor,
        gameCreator: GameCreator
    ): GameInteractor {
        return GameInteractorImpl(gameGatewayController, translationWordsInteractor, gameCreator)
    }

    @Provides
    @Singleton
    fun provideGameGatewayController(
        gameRemoteRepository: GameRemoteRepository,
        database: AppRoomDatabase,
        levelScoreDeferredUploaderHolder: LevelScoreDeferredUploaderHolder
    ): GameGatewayControllerImpl {
        return GameGatewayControllerImpl(
            gameRemoteRepository,
            database.gameInfoDao(),
            database.gameDao(),
            database.gameLevelDao(),
            levelScoreDeferredUploaderHolder
        )
    }

    @Singleton
    @Provides
    fun levelScoreDeferredUploaderHolder(
        gameRemoteRepository: GameRemoteRepository,
        database: AppRoomDatabase,
        workManagerWrapper: WorkManagerWrapper
    ): LevelScoreDeferredUploaderHolder {
        val factory = LevelScoreDeferredUploaderFactory(gameRemoteRepository, database.levelScoreRequestDao(), workManagerWrapper)

        return LevelScoreDeferredUploaderHolder(factory)
    }

    @Provides
    @Singleton
    fun provideGameRemoteRepository(webRequestsManagerAuthorised: WebRequestsManagerAuthorised): GameRemoteRepository {
        return GameRemoteRepository(webRequestsManagerAuthorised)
    }

    @Provides
    @Singleton
    fun provideGameCreator(gameGatewayControllerImpl: GameGatewayControllerImpl): GameCreator {
        return CustomGameCreator(gameGatewayControllerImpl, LevelInfoGenerator())
    }

    @Provides
    @Singleton
    fun provideContinueGameInteractor(gameGatewayControllerImpl: GameGatewayControllerImpl): ContinueGameInteractor {
        return ContinueGameInteractor(gameGatewayControllerImpl)
    }

    @Provides
    @Singleton
    fun provideWordsSetsViewModelFactory(
        gameInteractor: GameInteractor,
        continueGameInteractor: ContinueGameInteractor,
        ttsRepository: TtsRepository,
        settingsRepository: SettingsRepository,
        resourceManager: ResourceManager,
        trainingInteractor: TrainingInteractor,
        authorisationInteractor: AuthorisationInteractor,
        policyInteractor: PolicyInteractor
    ): WordsSetsViewModelFactory {
        return WordsSetsViewModelFactory(
            gameInteractor,
            continueGameInteractor,
            ttsRepository,
            settingsRepository,
            resourceManager,
            trainingInteractor,
            authorisationInteractor,
            policyInteractor
        )
    }


}