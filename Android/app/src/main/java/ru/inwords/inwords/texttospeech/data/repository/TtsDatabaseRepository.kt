package ru.inwords.inwords.texttospeech.data.repository

import ru.inwords.inwords.R
import ru.inwords.inwords.core.managers.ResourceManager
import java.io.File
import java.io.FileOutputStream

class TtsDatabaseRepository internal constructor(private val cacheDir: File, private val resourceManager: ResourceManager) {
    fun getFile(textToSpeak: String, extension: String): File {
        return File(cacheDir.resolve("tts"), textToSpeak.hashCode().toString() + extension)
    }

    fun storeFile(file: File, byteArray: ByteArray) {
        file.parentFile?.mkdirs()
        FileOutputStream(file).use {
            it.write(byteArray)
        }
    }

    fun getGoogleServicesApiKey(): String {
        return resourceManager.getString(R.string.google_api_key)
    }
}