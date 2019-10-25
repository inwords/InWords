package ru.inwords.inwords.texttospeech.data.repository

import io.reactivex.Single
import java.io.File

interface TtsRepository {
    fun synthesize(textToSpeak: String): Single<File>
    fun forget(textsToSpeak: List<String>): Single<List<Boolean>>
}