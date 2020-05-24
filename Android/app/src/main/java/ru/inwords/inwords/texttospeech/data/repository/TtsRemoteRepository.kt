package ru.inwords.inwords.texttospeech.data.repository

import io.reactivex.Single
import ru.inwords.inwords.texttospeech.data.bean.AudioConfig
import ru.inwords.inwords.texttospeech.data.grpc.TtsGrpcService

class TtsRemoteRepository internal constructor(private val ttsGrpcService: TtsGrpcService) {
    fun getTtsAudioContent(textToSpeak: String, audioConfig: AudioConfig, googleServicesApiKey: String): Single<ByteArray> {
//        val request = TtsSynthesizeRequest(
//            Input(textToSpeak),
//            Voice("en-US", "en-US-Wavenet-D"),
//            audioConfig
//        )

        return ttsGrpcService.ttsSynthesize(textToSpeak, audioConfig, googleServicesApiKey)
            .map { it.audioContent.toByteArray() }
    }
}
