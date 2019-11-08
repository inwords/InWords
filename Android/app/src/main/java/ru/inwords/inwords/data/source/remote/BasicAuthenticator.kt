package ru.inwords.inwords.data.source.remote

import okhttp3.Authenticator
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class BasicAuthenticator @Inject internal constructor(private val authenticatorTokenProvider: AuthenticatorTokenProvider) : Authenticator {
    override fun authenticate(route: Route?, response: Response): Request? {
        val header = response.request.header("Authorization")

        if (header != null/* && header.contains(AuthInfo.errorToken.accessToken)*/) { //TODO: think about COSTIL
            return null // Give up, we've already failed to authenticate.
        }

        val tokenResponse = authenticatorTokenProvider.getToken().blockingGet()

        return response.request.newBuilder()
                .header("Authorization", tokenResponse.bearer)
                .build()
    }
}