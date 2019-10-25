package ru.inwords.inwords.data.source.remote.session

import android.content.SharedPreferences
import io.reactivex.Single
import ru.inwords.inwords.dagger.annotations.Common
import ru.inwords.inwords.data.source.remote.AuthExceptionType
import ru.inwords.inwords.data.source.remote.AuthenticationException
import ru.inwords.inwords.profile.data.bean.UserCredentials
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthInfo @Inject constructor(@Common private val sharedPreferences: SharedPreferences) {
    var tokenResponse: TokenResponse = noToken

    private var credentialsInternal: UserCredentials = UserCredentials()
        get() {
            if (!field.validCredentials()) {
                val email = sharedPreferences.getString(PREFS_EMAIL, "")
                val password = sharedPreferences.getString(PREFS_PASSWORD, "")
                field = UserCredentials(email!!, password!!)
            }
            return field
        }
        set(value) {
            sharedPreferences.edit().putString(PREFS_EMAIL, value.email).apply()
            sharedPreferences.edit().putString(PREFS_PASSWORD, value.password).apply()

            field = value
        }

    fun getCredentials(): Single<UserCredentials> {
        return Single.fromCallable {
            val credentials = credentialsInternal

            if (!credentials.validCredentials()) {
                throw AuthenticationException("invalid credentials (no credentials)",
                        AuthExceptionType.NO_CREDENTIALS)
            }

            credentials
        }
    }

    fun setCredentials(userCredentials: UserCredentials): Single<UserCredentials> {
        return Single.fromCallable {
            credentialsInternal = userCredentials
            credentialsInternal
        }
    }

    fun getAuthToken(): Single<String> {
        return getCredentials()
                .map { tokenResponse.bearer }
    }

    val isNoToken: Boolean get() = tokenResponse == noToken
    val isError: Boolean get() = tokenResponse == errorToken
    val isUnauthorised: Boolean get() = tokenResponse == unauthorisedToken

    companion object {
        val noToken = TokenResponse()
        val errorToken = TokenResponse("error_token")
        val unauthorisedToken = TokenResponse("invalid_token")
    }
}

const val PREFS_EMAIL = "em"
const val PREFS_PASSWORD = "pa"

fun UserCredentials.validCredentials() = email.isNotBlank() && password.isNotBlank()