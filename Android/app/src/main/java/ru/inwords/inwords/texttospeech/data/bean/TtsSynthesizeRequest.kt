package ru.inwords.inwords.texttospeech.data.bean


data class Input(val text: String)
data class Voice(val languageCode: String, val name: String)
data class AudioConfig(val audioEncoding: String)

data class TtsSynthesizeRequest(val input: Input, val voice: Voice, val audioConfig: AudioConfig)

data class TtsSynthesizeResponse(val audioContent: String)