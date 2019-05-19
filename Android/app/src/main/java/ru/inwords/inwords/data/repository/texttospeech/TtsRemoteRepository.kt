package ru.inwords.inwords.data.repository.texttospeech

import io.reactivex.Single
import ru.inwords.inwords.data.source.webService.WebRequestsManager
import javax.inject.Inject

class TtsRemoteRepository @Inject internal constructor(private val webRequestsManager: WebRequestsManager) {
    fun getTtsAudioContent(textToSpeak: String, googleServicesApiKey: String): Single<String> {
        return webRequestsManager.ttsSynthesize(textToSpeak, googleServicesApiKey)
    }
}
