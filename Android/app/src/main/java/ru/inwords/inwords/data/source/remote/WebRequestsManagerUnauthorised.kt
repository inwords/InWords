package ru.inwords.inwords.data.source.remote

import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials
import ru.inwords.inwords.texttospeech.data.bean.TtsSynthesizeRequest

interface WebRequestsManagerUnauthorised {
    val authenticatedNotifier: Observable<Boolean>
    fun getToken(): Single<TokenResponse>
    fun getToken(userCredentials: UserCredentials): Single<TokenResponse>
    fun registerUser(userCredentials: UserCredentials): Single<TokenResponse>
    fun ttsSynthesize(request: TtsSynthesizeRequest, googleServicesApiKey: String): Single<String>
}