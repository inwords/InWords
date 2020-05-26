package ru.inwords.inwords.core.property

import java.io.Serializable

private object UNINITIALIZED_VALUE

// internal to be called from lazy in JS
class UnsafeInvalidatableLazy<out T>(private val initializer: () -> T) : Lazy<T>, Serializable {
    private var _value: Any? = UNINITIALIZED_VALUE

    override val value: T
        get() {
            if (_value === UNINITIALIZED_VALUE) {
                _value = initializer()
            }
            @Suppress("UNCHECKED_CAST")
            return _value as T
        }

    override fun isInitialized(): Boolean = _value !== UNINITIALIZED_VALUE

    override fun toString(): String = if (isInitialized()) value.toString() else "Lazy value not initialized yet."

    fun invalidate() {
        _value = UNINITIALIZED_VALUE
    }
}