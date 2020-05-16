package ru.inwords.inwords.authorisation.data.session

import android.content.SharedPreferences
import io.reactivex.Single
import ru.inwords.inwords.authorisation.data.AuthExceptionType
import ru.inwords.inwords.authorisation.data.AuthenticationException
import ru.inwords.inwords.core.property.IntNonNullPropertyDelegate
import ru.inwords.inwords.core.property.StringNonNullPropertyDelegate
import ru.inwords.inwords.dagger.annotations.Common
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class LastAuthInfoProvider @Inject constructor(@Common private val sharedPreferences: SharedPreferences) {

    private var userIdInternal: String by StringNonNullPropertyDelegate(PREFS_LAST_LOGGED_USER_ID, sharedPreferences) { "" }
    private var authMethodInternal: Int by IntNonNullPropertyDelegate(PREFS_LAST_AUTH_METHOD, sharedPreferences) { AUTH_METHOD_NONE }

    fun getUserId(): Single<String> {
        return Single.fromCallable { userIdInternal.requireUserId() }
    }

    fun setUserId(userId: String) {
        userIdInternal = userId
    }

    fun getAuthMethod(): AuthMethod {
        return codeToAuthMethod(authMethodInternal)
    }

    fun setAuthMethod(authMethod: AuthMethod) {
        authMethodInternal = authMethod.code
    }

    enum class AuthMethod(val code: Int) {
        NONE(AUTH_METHOD_NONE),
        NATIVE(AUTH_METHOD_NATIVE),
        GOOGLE(AUTH_METHOD_GOOGLE)
    }

    private fun codeToAuthMethod(code: Int): AuthMethod {
        return when (code) {
            AUTH_METHOD_NONE -> AuthMethod.NONE
            AUTH_METHOD_NATIVE -> AuthMethod.NATIVE
            AUTH_METHOD_GOOGLE -> AuthMethod.GOOGLE
            else -> AuthMethod.NONE
        }
    }

    companion object {
        private const val PREFS_LAST_LOGGED_USER_ID = "lluid"
        private const val PREFS_LAST_AUTH_METHOD = "lam"

        private const val AUTH_METHOD_NONE = 0
        private const val AUTH_METHOD_NATIVE = 1
        private const val AUTH_METHOD_GOOGLE = 2
    }
}

private fun String.validUserId() = this.isNotBlank()

private fun String.requireUserId(): String {
    if (!validUserId()) {
        throw AuthenticationException("invalid credentials (no credentials)", AuthExceptionType.NO_CREDENTIALS)
    }

    return this
}