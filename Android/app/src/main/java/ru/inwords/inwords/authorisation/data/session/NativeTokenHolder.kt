package ru.inwords.inwords.authorisation.data.session

class NativeTokenHolder internal constructor() {
    private var tokenResponse: TokenResponse = noToken

    fun setAuthToken(tokenResponse: TokenResponse) {
        this.tokenResponse = tokenResponse
    }

    fun getAuthToken(): TokenResponse {
        if (isNoToken) throw NoTokenException()
        if (isUnauthorised) throw UnauthorisedTokenException()

        return tokenResponse
    }

    fun setUnauthorisedToken() {
        setAuthToken(unauthorisedToken)
    }

    fun invalidateToken() {
        setAuthToken(noToken)
    }

    fun isUnauthorisedBearer(bearer: String?): Boolean {
        return bearer == unauthorisedToken.bearer
    }

    private val isNoToken: Boolean get() = tokenResponse == noToken
    val isUnauthorised: Boolean get() = tokenResponse == unauthorisedToken
    val seemsValid: Boolean get() = !isNoToken && !isUnauthorised && tokenResponse.bearer.length > 37 //TODO think about more convenient check

    class NoTokenException : Exception("no token")
    class UnauthorisedTokenException : Exception("invalid token")

    companion object {
        private val noToken = TokenResponse()
        private val unauthorisedToken = TokenResponse("invalid_token")
    }
}