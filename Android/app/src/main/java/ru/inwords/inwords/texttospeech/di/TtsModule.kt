package ru.inwords.inwords.texttospeech.di

import android.content.Context
import dagger.Lazy
import dagger.Module
import dagger.Provides
import io.grpc.ManagedChannel
import ru.inwords.inwords.core.error_handler.ErrorDataToDomainMapper
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.main_activity.di.annotations.GrpcTtsChannel
import ru.inwords.inwords.texttospeech.data.grpc.TtsGrpcService
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
        settingsRepository: SettingsRepository,
        @GrpcTtsChannel managedChannel: Lazy<ManagedChannel>,
        errorDataToDomainMapper: ErrorDataToDomainMapper
    ): TtsRepository {
        val remoteRepository = TtsRemoteRepository(TtsGrpcService(managedChannel), errorDataToDomainMapper)
        val databaseRepository = TtsDatabaseRepository(context.cacheDir, resourceManager)

        return TtsCachingRepository(databaseRepository, remoteRepository, settingsRepository)
    }
}