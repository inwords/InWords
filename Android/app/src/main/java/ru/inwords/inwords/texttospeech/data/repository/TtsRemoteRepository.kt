package ru.inwords.inwords.texttospeech.data.repository

import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorised
import ru.inwords.inwords.texttospeech.data.bean.AudioConfig
import ru.inwords.inwords.texttospeech.data.bean.Input
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeRequest
import ru.inwords.inwords.texttospeech.data.bean.Voice
import javax.inject.Inject

class TtsRemoteRepository @Inject internal constructor(private val webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised) {
    fun getTtsAudioContent(textToSpeak: String, audioConfig: AudioConfig, googleServicesApiKey: String): Single<String> {
        val request = TtsSynthesizeRequest(
            Input(textToSpeak),
            Voice("en-US", "en-US-Wavenet-D"),
            audioConfig)

        return webRequestsManagerUnauthorised.ttsSynthesize(request, googleServicesApiKey)
    }
}
