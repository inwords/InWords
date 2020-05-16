package ru.inwords.inwords.core.property

import android.content.SharedPreferences
import androidx.core.content.edit
import kotlin.reflect.KProperty

abstract class NonNullPropertyDelegate<T : Any>(
    val name: String,
    protected val preferences: SharedPreferences,
    protected val defaultValueProvider: () -> T
) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        return read()
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: T?) {
        if (value == null) {
            invalidate()
        } else {
            write(value)
        }
    }

    private fun invalidate() {
        preferences.edit { remove(name) }
    }

    abstract fun read(): T
    abstract fun write(value: T)
}