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
class NativeAuthInfo @Inject constructor(@Common private val sharedPreferences: SharedPreferences) {
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