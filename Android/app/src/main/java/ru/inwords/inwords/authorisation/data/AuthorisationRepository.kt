package ru.inwords.inwords.authorisation.data

import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.TokenResponse
import ru.inwords.inwords.profile.data.bean.UserCredentials

interface AuthorisationRepository {
    fun isUnauthorised(): Boolean
    fun invalidateToken()
    fun getToken(userCredentials: UserCredentials): Single<TokenResponse>
    fun getTokenGoogle(tokenId: String): Single<TokenResponse>
    fun registerUser(userCredentials: UserCredentials, isAnonymous: Boolean): Single<TokenResponse>
}