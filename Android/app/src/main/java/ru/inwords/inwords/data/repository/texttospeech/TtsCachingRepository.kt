package ru.inwords.inwords.data.repository.texttospeech

import io.reactivex.Single
import ru.inwords.inwords.core.util.SchedulersFacade
import java.io.File

class TtsCachingRepository(
        private val databaseRepository: TtsDatabaseRepository,
        private val remoteRepository: TtsRemoteRepository) : TtsRepository {

    override fun synthesize(textToSpeak: String): Single<File> {
        return Single.fromCallable {
            val synthesizedFile = databaseRepository.getFile(textToSpeak)

            if (!synthesizedFile.exists()) {
                val audioContent = remoteRepository.getTtsAudioContent(textToSpeak)
                databaseRepository.storeFile(synthesizedFile, audioContent.toByteArray())
            }

            synthesizedFile
        }.subscribeOn(SchedulersFacade.io())
    }
}
