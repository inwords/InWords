package ru.inwords.inwords.data.source.webService.session

import android.content.SharedPreferences
import io.reactivex.Single
import ru.inwords.inwords.data.dto.UserCredentials
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthInfo @Inject constructor(private val sharedPreferences: SharedPreferences) {
    var tokenResponse: TokenResponse = noToken

    val bearer: String get() = tokenResponse.bearer

    private var credentialsInternal: UserCredentials = UserCredentials()
        get() {
            if (!validCredentials(field)) {
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
        return Single.fromCallable { credentialsInternal }
    }

    fun setCredentials(userCredentials: UserCredentials): Single<UserCredentials> {
        return Single.fromCallable {
            credentialsInternal = userCredentials
            credentialsInternal
        }
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

fun validCredentials(userCredentials: UserCredentials) = userCredentials.email.isNotBlank() && userCredentials.password.isNotBlank()