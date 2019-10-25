package ru.inwords.inwords.texttospeech.data.repository

import io.reactivex.Single
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.repository.SettingsRepository
import ru.inwords.inwords.texttospeech.data.bean.AudioConfig
import java.io.File

class TtsCachingRepository(
    private val databaseRepository: TtsDatabaseRepository,
    private val remoteRepository: TtsRemoteRepository) : TtsRepository {

    override fun synthesize(textToSpeak: String): Single<File> {
        return Single.fromCallable { databaseRepository.getFile(textToSpeak, getExtension()) }
                .flatMap { synthesizedFile ->
                    if (!synthesizedFile.exists()) {
                        remoteRepository.getTtsAudioContent(textToSpeak, getAudioConfig(), databaseRepository.getGoogleServicesApiKey())
                                .map {
                                    databaseRepository.storeFile(synthesizedFile, it)
                                    synthesizedFile
                                }
                    } else {
                        Single.just(synthesizedFile)
                    }
                }
                .subscribeOn(SchedulersFacade.io())
    }

    override fun forget(textsToSpeak: List<String>): Single<List<Boolean>> {
        return Single.fromCallable {
            textsToSpeak.map { databaseRepository.getFile(it, getExtension()).delete()  }
        }
    }

    private fun getAudioConfig(): AudioConfig {
        val config = if (SettingsRepository.useOpus) {
            "OGG_OPUS"
        } else {
            "MP3"
        }
        return AudioConfig(config)
    }

    private fun getExtension(): String {
        return if (SettingsRepository.useOpus) {
            ".ogg"
        } else {
            ".mp3"
        }
    }
}
