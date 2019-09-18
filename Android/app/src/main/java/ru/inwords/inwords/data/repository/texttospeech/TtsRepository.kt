package ru.inwords.inwords.data.repository.texttospeech

import io.reactivex.Single
import java.io.File

interface TtsRepository {
    fun synthesize(textToSpeak: String): Single<File>
    fun forget(textsToSpeak: List<String>): Single<List<Boolean>>
}