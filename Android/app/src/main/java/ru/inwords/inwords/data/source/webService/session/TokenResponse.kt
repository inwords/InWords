package ru.inwords.inwords.data.source.webService.session

import com.google.gson.annotations.SerializedName

class TokenResponse(
        @SerializedName("token") val accessToken: String = "",
        @SerializedName("userId") val userId: Int = 0
) {
    //TODO think about more convenient check
    val isValid: Boolean get() = accessToken.length > 30

    val bearer: String get() = "Bearer $accessToken"

    companion object {
        fun errorToken(): TokenResponse {
            return TokenResponse("error_token", 0)
        }
    }
}
