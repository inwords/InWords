package ru.inwords.inwords.data.source.webService

import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route
import ru.inwords.inwords.data.source.webService.session.TokenResponse
import javax.inject.Inject

class BasicAuthenticator @Inject internal constructor() : Authenticator {
    private var callback: OnUnauthorisedCallback? = null

    interface OnUnauthorisedCallback {
        fun perform(): TokenResponse
    }

    fun setOnUnauthorisedCallback(callback: OnUnauthorisedCallback) {
        this.callback = callback
    }

    override fun authenticate(route: Route?, response: Response): Request? {
        val errorToken = TokenResponse.errorToken()

        val header = response.request().header("Authorization")

        val callbackNonNull = callback ?: return null

        if (header != null && header.contains(errorToken.accessToken)) { //TODO: think about COSTIL
            return null // Give up, we've already failed to authenticate.
        }

        val tokenResponse = callbackNonNull.perform()

        return response.request().newBuilder()
                .header("Authorization", tokenResponse.bearer)
                .build()
    }
}