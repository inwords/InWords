package ru.inwords.inwords.core.util

/**
 * Used as a wrapper for data that is exposed via a LiveData that represents an event.
 */
class Event<T : Any>(private val content: T) {
    private var hasBeenHandled = false

    /**
     * Returns the content and prevents its use again.
     */
    val contentIfNotHandled: T?
        get() {
            return if (hasBeenHandled) {
                null
            } else {
                hasBeenHandled = true
                content
            }
        }

    fun handle(): Boolean {
        return if (hasBeenHandled) {
            false
        } else {
            hasBeenHandled = true
            true
        }
    }

    /**
     * Returns the content, even if it's already been handled.
     */
    fun peekContent(): T {
        return content
    }
}
