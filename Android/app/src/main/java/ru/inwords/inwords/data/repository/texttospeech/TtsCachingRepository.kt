package ru.inwords.inwords.data.repository.texttospeech

import io.reactivex.Single
import ru.inwords.inwords.core.util.SchedulersFacade
import java.io.File

class TtsCachingRepository(
        private val databaseRepository: TtsDatabaseRepository,
        private val remoteRepository: TtsRemoteRepository) : TtsRepository {

    override fun synthesize(textToSpeak: String): Single<File> {
        return Single.fromCallable { databaseRepository.getFile(textToSpeak) }
                .flatMap { synthesizedFile ->
                    if (!synthesizedFile.exists()) {
                        remoteRepository.getTtsAudioContent(textToSpeak, databaseRepository.getGoogleServicesApiKey())
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
}
