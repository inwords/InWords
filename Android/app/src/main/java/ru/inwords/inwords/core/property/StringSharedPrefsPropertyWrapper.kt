package ru.inwords.inwords.core.property

import android.content.SharedPreferences

class StringSharedPrefsPropertyWrapper(name: String, preferences: SharedPreferences) : SharedPrefsPropertyWrapper<String>(name, preferences) {
    override fun read(): String? {
        return preferences.getString(name, null)
    }

    override fun write(value: String?) = edit { it.putString(name, value) }
}