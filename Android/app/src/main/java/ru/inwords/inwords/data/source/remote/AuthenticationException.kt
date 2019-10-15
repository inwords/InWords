package ru.inwords.inwords.data.source.remote

class AuthenticationException(message: String, val exceptionType: AuthExceptionType) : RuntimeException(message)

enum class AuthExceptionType {
    UNHANDLED,
    NO_CREDENTIALS,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    USER_DOES_NOT_EXISTS
}