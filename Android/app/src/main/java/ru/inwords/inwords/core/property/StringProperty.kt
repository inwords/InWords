package ru.inwords.inwords.core.property

import android.content.SharedPreferences
import androidx.core.content.edit

class StringProperty(
    name: String,
    preferences: SharedPreferences,
    defaultValueProvider: () -> String
) : Property<String>(name, preferences, defaultValueProvider) {

    override fun read(): String {
        return preferences.getString(name, defaultValueProvider.invoke())!!
    }

    override fun write(value: String) {
        preferences.edit { putString(name, value) }
    }
}