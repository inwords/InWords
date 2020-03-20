package ru.inwords.inwords.data.source.remote

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.data.source.remote.AuthExceptionType.NO_CREDENTIALS
import ru.inwords.inwords.data.source.remote.session.LastAuthInfoProvider
import ru.inwords.inwords.data.source.remote.session.LastAuthInfoProvider.AuthMethod.*
import ru.inwords.inwords.data.source.remote.session.NativeAuthInfo
import ru.inwords.inwords.data.source.remote.session.TokenResponse
import javax.inject.Inject

class AuthenticatorTokenProvider @Inject internal constructor(
    private val webRequestsManagerUnauthorised: WebRequestsManagerUnauthorised,
    private val nativeAuthInfo: NativeAuthInfo,
    private val signInWithGoogle: SignInWithGoogle,
    private val lastAuthInfoProvider: LastAuthInfoProvider
) {
    fun getTokenSilently(): Single<TokenResponse> {
        return when (lastAuthInfoProvider.getAuthMethod()) {
            NONE -> Single.error(AuthenticationException("never authenticated before -> no way to authenticate silently", NO_CREDENTIALS))
            NATIVE -> {
                nativeAuthInfo.getCredentials()
                    .flatMap { webRequestsManagerUnauthorised.getToken(it) }
            }
            GOOGLE -> {
                signInWithGoogle.silentSignIn()
                    .flatMap {
                        Log.d(TAG, it.idToken)
                        webRequestsManagerUnauthorised.getTokenGoogle(it.idToken)
                    }
            }
        }
    }

    companion object {
        const val TAG = "AuthenticatorTokenProvi"
    }
}