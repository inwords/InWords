package ru.inwords.inwords.authorisation.data.session

data class TokenResponse(
    val accessToken: String = "",
    val userId: Long = 0
) {
    val bearer: String get() = "Bearer $accessToken"

    //TODO think about more convenient check
    val isValid: Boolean get() = accessToken.length > 30
}
