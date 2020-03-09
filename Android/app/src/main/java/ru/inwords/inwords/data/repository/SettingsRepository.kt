package ru.inwords.inwords.data.repository

import android.content.Context
import android.content.SharedPreferences
import androidx.preference.PreferenceManager
import ru.inwords.inwords.R
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SettingsRepository @Inject constructor(context: Context) {
    private lateinit var preferences: SharedPreferences

    private lateinit var keyUseOpus: String
    private lateinit var keyScaleGame: String

    init {
        initialize(context)
    }

    private fun initialize(context: Context) {
        preferences = PreferenceManager.getDefaultSharedPreferences(context)

        keyUseOpus = context.getString(R.string.key_use_opus)
        keyScaleGame = context.getString(R.string.key_scale_game)
    }

    val useOpus: Boolean get() = preferences.getBoolean(keyUseOpus, false)
    val scaleGame: Boolean get() = preferences.getBoolean(keyScaleGame, false)
}