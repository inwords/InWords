package ru.inwords.inwords.authorisation.data.session

data class TokenResponse(
    private val accessToken: String = "",
    val userId: Long = 0
) {
    val bearer = "Bearer $accessToken"
}
