package ru.inwords.inwords.authorisation.data

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider
import ru.inwords.inwords.authorisation.data.session.LastAuthInfoProvider.AuthMethod.*
import ru.inwords.inwords.authorisation.data.session.NativeAuthInfo
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.network.TokenResponse

class AuthenticatorTokenProvider internal constructor(
    private val authorisationRepository: AuthorisationRepository,
    private val nativeAuthInfo: NativeAuthInfo,
    private val signInWithGoogle: SignInWithGoogle,
    private val lastAuthInfoProvider: LastAuthInfoProvider
) {
    fun getTokenSilently(): Single<TokenResponse> {
        return when (lastAuthInfoProvider.getAuthMethod()) {
            NONE -> Single.error(NeverAuthenticatedBeforeException("never authenticated before -> no way to authenticate silently"))
            NATIVE -> {
                nativeAuthInfo.getCredentials()
                    .flatMap { authorisationRepository.getToken(it) }
            }
            GOOGLE -> {
                signInWithGoogle.silentSignIn()
                    .flatMap {
                        Log.d(TAG, it.idToken)
                        authorisationRepository.getTokenGoogle(it.idToken)
                    }
            }
        }
    }

    companion object {
        const val TAG = "AuthenticatorTokenProvi"
    }
}