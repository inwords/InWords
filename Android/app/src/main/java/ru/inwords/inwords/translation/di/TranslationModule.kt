package ru.inwords.inwords.translation.di

import dagger.Lazy
import dagger.Module
import dagger.Provides
import io.grpc.ManagedChannel
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.main_activity.data.source.database.AppRoomDatabase
import ru.inwords.inwords.main_activity.di.annotations.GrpcDefaultChannel
import ru.inwords.inwords.network.AuthorisedRequestsManager
import ru.inwords.inwords.network.grpc.TokenHeaderAttachingClientInterceptor
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import ru.inwords.inwords.translation.data.deferred.LocalWordTranslationsListDao
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterFactory
import ru.inwords.inwords.translation.data.deferred.WordTranslationDeferredAdapterHolder
import ru.inwords.inwords.translation.data.grpc.DictionaryGrpcService
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.data.repository.TranslationWordsWebApiRepository
import ru.inwords.inwords.translation.data.sync.TranslationSyncController
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractorImpl
import ru.inwords.inwords.translation.presentation.TranslationViewModelFactory
import javax.inject.Singleton

@Module
class TranslationModule {
    @Singleton
    @Provides
    fun provideWordTranslationDeferredAdapterHolder(
        database: AppRoomDatabase,
        translationWordsRemoteRepository: TranslationWordsRemoteRepository
    ): WordTranslationDeferredAdapterHolder {
        val factory = WordTranslationDeferredAdapterFactory(
            LocalWordTranslationsListDao(database.localWordTranslationEntriesListDao()),
            translationWordsRemoteRepository
        )

        return WordTranslationDeferredAdapterHolder(factory)
    }

    @Singleton
    @Provides
    fun provideTranslationWordsInteractor(
        translationWordsRemoteRepository: TranslationWordsRemoteRepository,
        adapterHolder: WordTranslationDeferredAdapterHolder
    ): TranslationWordsInteractor {
        val translationSyncController = TranslationSyncController(adapterHolder)

        return TranslationWordsInteractorImpl(translationWordsRemoteRepository, adapterHolder, translationSyncController)
    }

    @Singleton
    @Provides
    fun provideTranslationWordsRemoteRepository(
        authorisedRequestsManager: AuthorisedRequestsManager,
        @GrpcDefaultChannel managedChannel: Lazy<ManagedChannel>,
        tokenHeaderAttachingClientInterceptor: TokenHeaderAttachingClientInterceptor
    ): TranslationWordsRemoteRepository {
        return TranslationWordsWebApiRepository(DictionaryGrpcService(managedChannel, tokenHeaderAttachingClientInterceptor), authorisedRequestsManager)
    }

    @Provides
    @Singleton
    fun provideTranslationViewModelFactory(
        translationWordsInteractor: TranslationWordsInteractor,
        ttsRepository: TtsRepository,
        settingsRepository: SettingsRepository,
        resourceManager: ResourceManager,
        gameCreator: GameCreator
    ): TranslationViewModelFactory {
        return TranslationViewModelFactory(translationWordsInteractor, ttsRepository, settingsRepository, resourceManager, gameCreator)
    }
}