package ru.inwords.inwords.core.error_handler

import io.grpc.StatusRuntimeException
import ru.inwords.inwords.network.grpc.GrpcStatus

fun GrpcStatus.mapToNetworkRequestStatus(): NetworkRequestStatus {
    return when (this) {
        GrpcStatus.OK -> NetworkRequestStatus.OK
        GrpcStatus.CANCELLED -> NetworkRequestStatus.CANCELLED
        GrpcStatus.UNKNOWN -> NetworkRequestStatus.UNKNOWN
        GrpcStatus.INVALID_ARGUMENT, GrpcStatus.OUT_OF_RANGE, GrpcStatus.FAILED_PRECONDITION -> NetworkRequestStatus.INVALID_ARGUMENT
        GrpcStatus.ALREADY_EXISTS -> NetworkRequestStatus.ALREADY_EXISTS
        GrpcStatus.PERMISSION_DENIED -> NetworkRequestStatus.PERMISSION_DENIED
        GrpcStatus.RESOURCE_EXHAUSTED -> NetworkRequestStatus.RESOURCE_EXHAUSTED
        GrpcStatus.UNIMPLEMENTED -> NetworkRequestStatus.UNIMPLEMENTED
        GrpcStatus.NOT_FOUND -> NetworkRequestStatus.NOT_FOUND
        GrpcStatus.INTERNAL, GrpcStatus.DATA_LOSS, GrpcStatus.ABORTED -> NetworkRequestStatus.INTERNAL
        GrpcStatus.UNAVAILABLE, GrpcStatus.DEADLINE_EXCEEDED -> NetworkRequestStatus.LOW_CONNECTION
        GrpcStatus.UNAUTHENTICATED -> NetworkRequestStatus.UNAUTHENTICATED
    }
}

fun StatusRuntimeException.mapToNetworkException(): NetworkException {
    val grpcStatus = GrpcStatus.from(status)
    val mappedStatus = grpcStatus.mapToNetworkRequestStatus()

    val description = status.description.orEmpty()
    val message = "trailers: $trailers\noriginal status (${status.code}) description:$description"

    //TODO разобрать также org.chromium.net.NetworkException

    return NetworkException(mappedStatus, description, message)
}

class NetworkException(val status: NetworkRequestStatus, val description: String, message: String) : RuntimeException(message)

