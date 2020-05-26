package ru.inwords.inwords.texttospeech.data.grpc

import com.google.cloud.texttospeech.v1beta1.*
import dagger.Lazy
import io.grpc.ManagedChannel
import io.grpc.Metadata
import io.grpc.stub.MetadataUtils
import io.reactivex.Single
import ru.inwords.inwords.core.utils.unsafeLazy
import ru.inwords.inwords.main_activity.di.annotations.GrpcTtsChannel
import ru.inwords.inwords.texttospeech.data.bean.AudioConfig
import javax.inject.Inject
import javax.inject.Singleton
import com.google.cloud.texttospeech.v1beta1.AudioConfig as TextToSpeechAudioConfig

@Singleton
class TtsGrpcService @Inject internal constructor(
    @GrpcTtsChannel managedChannel: Lazy<ManagedChannel>
) {
    private val wordSetStub: TextToSpeechGrpc.TextToSpeechBlockingStub by unsafeLazy {
        TextToSpeechGrpc.newBlockingStub(managedChannel.get())
    }

    private val key = Metadata.Key.of("X-Goog-Api-Key", Metadata.ASCII_STRING_MARSHALLER)
    private val metadata = Metadata()

    fun ttsSynthesize(textToSpeak: String, audioConfig: AudioConfig, googleServicesApiKey: String): Single<SynthesizeSpeechResponse> {
        val request = SynthesizeSpeechRequest.newBuilder()
            .setInput(SynthesisInput.newBuilder().setText(textToSpeak))
            .setVoice(VoiceSelectionParams.newBuilder().setLanguageCode("en-US").setName("en-US-Wavenet-D"))
            .setAudioConfig(
                TextToSpeechAudioConfig.newBuilder().setAudioEncoding(
                    AudioEncoding.valueOf(audioConfig.audioEncoding)
                )
            )
            .build()

        return Single.fromCallable {
            wordSetStub
                .withInterceptors(MetadataUtils.newAttachHeadersInterceptor(metadata.apply {
                    removeAll(key)
                    put(key, googleServicesApiKey)
                }))
                .synthesizeSpeech(request)
        }
    }
}