package ru.inwords.inwords.data.source.remote

import javax.inject.Inject

class AuthenticatorTokenProvider @Inject internal constructor(private val webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised) {
    fun getToken() = webRequestsManagerUnauthorised.getToken()
}