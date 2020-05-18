package ru.inwords.inwords.texttospeech.di

import android.content.Context
import dagger.Module
import dagger.Provides
import ru.inwords.inwords.authorisation.data.WebRequestsManagerUnauthorised
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsCachingRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsDatabaseRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsRemoteRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import javax.inject.Singleton

@Module
class TtsModule {
    @Provides
    @Singleton
    fun ttsRep(
        context: Context,
        resourceManager: ResourceManager,
        webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised,
        settingsRepository: SettingsRepository
    ): TtsRepository {
        val remoteRepository = TtsRemoteRepository(webRequestsManagerUnauthorised)
        val databaseRepository = TtsDatabaseRepository(context.cacheDir, resourceManager)

        return TtsCachingRepository(databaseRepository, remoteRepository, settingsRepository)
    }
}