package ru.inwords.inwords.data.source.remote

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.data.dto.google.TtsSynthesizeRequest
import ru.inwords.inwords.data.source.remote.session.TokenResponse

interface WebRequestsManagerUnauthorised {
    val authenticatedNotifier: Observable<Boolean>
    fun getToken(): Single<TokenResponse>
    fun getToken(userCredentials: UserCredentials): Single<TokenResponse>
    fun registerUser(userCredentials: UserCredentials): Single<TokenResponse>
    fun ttsSynthesize(request: TtsSynthesizeRequest, googleServicesApiKey: String): Single<String>
}