package ru.inwords.inwords.core.resource

/**
 * A sealed class representing some resource loading status
 */
sealed class Resource<out T : Any> {
    data class Success<out T : Any>(val data: T, val source: Source = Source.NOT_SET) : Resource<T>()
    data class Loading<out T : Any>(val source: Source = Source.NOT_SET) : Resource<T>()
    data class Error<out T : Any>(
        val message: String? = null,
        val throwable: Throwable? = null,
        val source: Source = Source.NOT_SET
    ) : Resource<T>()
}

enum class Source {
    NETWORK, CACHE, PREFETCH, NOT_SET
}