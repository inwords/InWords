package ru.inwords.inwords.domain.model

/**
 * A sealed class representing some resource loading status
 */
sealed class Resource<out T : Any> {
    data class Success<out T : Any>(val data: T) : Resource<T>()
    data class Loading<out T : Any>(val data: T? = null) : Resource<T>()
    data class Error<out T : Any>(val message: String? = null, val throwable: Throwable? = null) : Resource<T>()
}