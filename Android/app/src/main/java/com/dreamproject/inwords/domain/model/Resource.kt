package com.dreamproject.inwords.domain.model

/**
 * A generic class that contains data and status about loading this data.
 *
 * @param data is non-null on success
 */
data class Resource<T : Any> internal constructor(val status: Status, val data: T?, val message: String?) {
    enum class Status {
        SUCCESS, ERROR, LOADING
    }

    fun success() = status == Status.SUCCESS
    fun loading() = status == Status.LOADING
    fun error() = status == Status.ERROR

    companion object {
        fun <T : Any> success(data: T): Resource<T> {
            return Resource(Status.SUCCESS, data, null)
        }

        fun <T : Any> loading(data: T?): Resource<T> {
            return Resource(Status.LOADING, data, null)
        }

        fun <T : Any> error(msg: String?, data: T?): Resource<T> {
            return Resource(Status.ERROR, data, msg)
        }
    }
}
