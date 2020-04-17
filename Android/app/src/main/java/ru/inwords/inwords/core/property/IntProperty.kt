package ru.inwords.inwords.core.property

import android.content.SharedPreferences
import androidx.core.content.edit

class IntProperty(
    name: String,
    preferences: SharedPreferences,
    defaultValueProvider: () -> Int
) : Property<Int>(name, preferences, defaultValueProvider) {

    override fun read(): Int {
        return preferences.getInt(name, defaultValueProvider.invoke())
    }

    override fun write(value: Int) {
        preferences.edit { putInt(name, value) }
    }
}