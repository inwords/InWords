package ru.inwords.inwords.data.repository.texttospeech

import android.content.Context
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

class TtsDatabaseRepository @Inject internal constructor(private val context: Context) {
    fun getFile(textToSpeak: String): File {
        return File(context.cacheDir, textToSpeak.hashCode().toString() + ".ogg")
    }

    fun storeFile(file: File, byteArray: ByteArray) {
        FileOutputStream(file).use {
            it.write(byteArray)
        }
    }
}