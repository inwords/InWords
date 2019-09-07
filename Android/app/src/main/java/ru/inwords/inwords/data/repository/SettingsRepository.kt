package ru.inwords.inwords.data.repository

import android.content.Context
import android.content.SharedPreferences
import androidx.preference.PreferenceManager
import ru.inwords.inwords.R

object SettingsRepository {
    lateinit var preferences: SharedPreferences

    lateinit var keyUseOpus: String

    fun initialize(context: Context) {
        preferences = PreferenceManager.getDefaultSharedPreferences(context)

        keyUseOpus = context.getString(R.string.key_use_opus)
    }

    val useOpus by lazy { preferences.getBoolean(keyUseOpus, false) }
}