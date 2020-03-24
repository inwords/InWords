package ru.inwords.inwords.authorisation.data

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.AuthExceptionType.NO_CREDENTIALS
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider.AuthMethod.*
import ru.inwords.inwords.authorisation.data.session.NativeAuthInfo
import ru.inwords.inwords.authorisation.data.session.TokenResponse
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
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