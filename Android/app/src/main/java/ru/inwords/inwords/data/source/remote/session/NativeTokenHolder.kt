package ru.inwords.inwords.data.source.remote.session

import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class NativeTokenHolder @Inject constructor() {
    private var tokenResponse: TokenResponse = noToken

    fun setAuthToken(tokenResponse: TokenResponse) {
        this.tokenResponse = tokenResponse
    }

    fun getAuthToken(): TokenResponse {
        if (isNoToken) throw NoTokenException()
        if (isUnauthorised) throw UnauthorisedTokenException()

        return tokenResponse
    }

    val isNoToken: Boolean get() = tokenResponse == noToken
    val isUnauthorised: Boolean get() = tokenResponse == unauthorisedToken

    class NoTokenException : Exception("no token")
    class UnauthorisedTokenException : Exception("invalid token")

    companion object {
        val noToken = TokenResponse()
        val unauthorisedToken = TokenResponse("invalid_token")
    }
}