package ru.inwords.inwords.data.repository.texttospeech

import io.reactivex.Single
import ru.inwords.inwords.data.dto.google.AudioConfig
import ru.inwords.inwords.data.dto.google.Input
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.dto.google.Voice
import ru.inwords.inwords.data.source.remote.WebRequestsManagerUnauthorised
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
