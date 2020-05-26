package ru.inwords.inwords.main_activity.data.repository

import android.content.Context
import android.content.SharedPreferences
import android.content.SharedPreferences.OnSharedPreferenceChangeListener
import androidx.preference.PreferenceManager
import ru.inwords.inwords.R
import ru.inwords.inwords.core.property.UnsafeInvalidatableLazy

class SettingsRepository internal constructor(context: Context) {
    private var preferences: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)

    private var keyUseOpus = context.getString(R.string.key_use_opus)
    private var keyScaleGame = context.getString(R.string.key_scale_game)

    private val useOpusProvider = UnsafeInvalidatableLazy { preferences.getBoolean(keyUseOpus, false) }
    private val scaleGameProvider = UnsafeInvalidatableLazy { preferences.getBoolean(keyScaleGame, false) }

    private val listener = OnSharedPreferenceChangeListener { _, key ->
        if (key == keyUseOpus) {
            useOpusProvider.invalidate()
        }
        if (key == keyScaleGame) {
            scaleGameProvider.invalidate()
        }
    }

    init {
        preferences.registerOnSharedPreferenceChangeListener(listener)
    }

    val useOpus: Boolean get() = useOpusProvider.value
    val scaleGame: Boolean get() = scaleGameProvider.value
}