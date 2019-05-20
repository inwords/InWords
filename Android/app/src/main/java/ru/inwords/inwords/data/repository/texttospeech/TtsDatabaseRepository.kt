package ru.inwords.inwords.data.repository.texttospeech

import android.content.Context
import android.util.Base64
import ru.inwords.inwords.R
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

class TtsDatabaseRepository @Inject internal constructor(private val context: Context) {
    fun getFile(textToSpeak: String): File {
        return File(context.cacheDir, textToSpeak.hashCode().toString() + ".ogg")
    }

    fun storeFile(file: File, base64String: String) {
        FileOutputStream(file).use {
            it.write(Base64.decode(base64String, Base64.DEFAULT))
        }
    }

    fun getGoogleServicesApiKey(): String {
        return context.resources.getString(R.string.google_api_key)
    }
}