package ru.inwords.inwords.network

data class TokenResponse(
    private val accessToken: String = "",
    val userId: Long = 0
) {
    val bearer = "Bearer $accessToken"
}
