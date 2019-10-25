package ru.inwords.inwords.texttospeech.data.repository

import android.content.Context
import android.util.Base64
import ru.inwords.inwords.R
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

class TtsDatabaseRepository @Inject internal constructor(private val context: Context) {
    fun getFile(textToSpeak: String, extension: String): File {
        return File(context.cacheDir.resolve("tts"), textToSpeak.hashCode().toString() + extension)
    }

    fun storeFile(file: File, base64String: String) {
        file.parentFile?.mkdirs()
        FileOutputStream(file).use {
            it.write(Base64.decode(base64String, Base64.DEFAULT))
        }
    }

    fun getGoogleServicesApiKey(): String {
        return context.resources.getString(R.string.google_api_key)
    }
}