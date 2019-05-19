package ru.inwords.inwords.data.repository.texttospeech

import android.content.res.Resources
import com.google.auth.oauth2.ServiceAccountCredentials
import com.google.cloud.texttospeech.v1.*
import com.google.protobuf.ByteString
import ru.inwords.inwords.R
import javax.inject.Inject

class TtsRemoteRepository @Inject internal constructor(private val resources: Resources) {
    fun getTtsAudioContent(textToSpeak: String): ByteString {
        val settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider {
                    ServiceAccountCredentials
                            .fromStream(resources.openRawResource(R.raw.inwords_d3d8ee947c49))
                }
                .build()

        return TextToSpeechClient.create(settings).use { textToSpeechClient ->
            // Set the text input to be synthesized
            val input = SynthesisInput.newBuilder()
                    .setText(textToSpeak)
                    .build()

            // Build the voice request, select the language code ("en-US") and the ssml voice gender
            // ("neutral")
            val voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode("en-US")
                    .setSsmlGender(SsmlVoiceGender.NEUTRAL)
                    .build()

            // Select the type of audio file you want returned
            val audioConfig = AudioConfig.newBuilder()

                    .setAudioEncoding(AudioEncoding.OGG_OPUS)
                    .build()

            // Perform the text-to-speech request on the text input with the selected voice parameters and
            // audio file type
            val response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig)

            // Get the audio contents from the response
            response.audioContent
        }
    }
}
