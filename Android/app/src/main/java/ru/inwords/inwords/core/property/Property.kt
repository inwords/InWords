package ru.inwords.inwords.core.property

import android.content.SharedPreferences
import kotlin.reflect.KProperty

abstract class Property<T>(
    val name: String,
    protected val preferences: SharedPreferences,
    protected val defaultValueProvider: () -> T
) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        return read()
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        write(value)
    }

    abstract fun read(): T
    abstract fun write(value: T)
}