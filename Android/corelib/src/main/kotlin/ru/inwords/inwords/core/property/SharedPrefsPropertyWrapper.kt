package ru.inwords.inwords.core.property

import android.content.SharedPreferences

abstract class SharedPrefsPropertyWrapper<T : Any>(
    val name: String,
    protected val preferences: SharedPreferences
) {
    fun read(defaultValueProvider: () -> T): T {
        return read() ?: defaultValueProvider.invoke()
    }

    abstract fun read(): T?
    abstract fun write(value: T?)

    protected fun edit(editor: (SharedPreferences.Editor) -> Unit) {
        val edit = preferences.edit()
        editor.invoke(edit)
        edit.apply()
    }
}