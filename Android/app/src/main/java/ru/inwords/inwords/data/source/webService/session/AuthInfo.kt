package ru.inwords.inwords.data.source.webService.session

import android.content.SharedPreferences
import ru.inwords.inwords.data.dto.UserCredentials
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthInfo @Inject constructor(private val sharedPreferences: SharedPreferences) {
    var tokenResponse: TokenResponse = TokenResponse()

    var credentials: UserCredentials = UserCredentials()
        get() {
            if (!validCredentials(field)) {
                val email = sharedPreferences.getString(PREFS_EMAIL, "")
                val password = sharedPreferences.getString(PREFS_PASSWORD, "")
                credentials = UserCredentials(email!!, password!!)
            }
            return field
        }
    set(value){
        sharedPreferences.edit().putString(PREFS_EMAIL, value.email).apply()
        sharedPreferences.edit().putString(PREFS_PASSWORD, value.password).apply()

        field = value
    }
}

const val PREFS_EMAIL = "em"
const val PREFS_PASSWORD = "pa"

fun validCredentials(userCredentials: UserCredentials) = userCredentials.email.isNotBlank() && userCredentials.password.isNotBlank()