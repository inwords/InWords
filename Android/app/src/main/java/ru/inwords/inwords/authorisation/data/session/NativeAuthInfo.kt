package ru.inwords.inwords.authorisation.data.session

import android.content.SharedPreferences
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.AuthExceptionType
import ru.inwords.inwords.authorisation.data.AuthenticationException
import ru.inwords.inwords.profile.data.bean.UserCredentials

class NativeAuthInfo internal constructor(private val sharedPreferences: SharedPreferences) {
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
        return Single.fromCallable { credentialsInternal.requireCredentials() }
    }

    fun setCredentials(userCredentials: UserCredentials) {
        credentialsInternal = userCredentials
    }

    companion object {
        private const val PREFS_EMAIL = "em"
        private const val PREFS_PASSWORD = "pa"
    }
}

fun UserCredentials.validCredentials() = email.isNotBlank() && password.isNotBlank()

fun UserCredentials.requireCredentials(): UserCredentials {
    if (!validCredentials()) {
        throw AuthenticationException("invalid credentials (no credentials)", AuthExceptionType.NO_CREDENTIALS)
    }

    return this
}