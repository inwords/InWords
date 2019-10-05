package ru.inwords.inwords.core.resource

/**
 * A sealed class representing some resource loading status
 */
sealed class Resource<out T : Any> {
    data class Success<out T : Any>(val data: T) : Resource<T>()
    class Loading<out T : Any> : Resource<T>()
    data class Error<out T : Any>(val message: String? = null, val throwable: Throwable? = null) : Resource<T>()
}