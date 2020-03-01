package ru.inwords.inwords.data.source.remote.session

import com.google.gson.annotations.SerializedName

class TokenResponse(
        @SerializedName("token") val accessToken: String = "",
        @SerializedName("userId") val userId: Long = 0
) {
    val bearer: String get() = "Bearer $accessToken"

    //TODO think about more convenient check
    val isValid: Boolean get() = accessToken.length > 30
}
