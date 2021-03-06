package ru.inwords.inwords.network.error_handler

import io.grpc.StatusRuntimeException

class ErrorDataToDomainMapper {
    fun processThrowable(throwable: Throwable): Throwable {
        return when (throwable) {
            is StatusRuntimeException -> throwable.mapToNetworkException()
            else -> throwable
        }
    }
}