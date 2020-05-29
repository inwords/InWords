package ru.inwords.inwords.core.error_handler

import android.util.Log
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes.*
import com.google.android.gms.common.api.ApiException
import ru.inwords.inwords.R
import ru.inwords.inwords.core.error_handler.NetworkRequestStatus.*
import ru.inwords.inwords.core.managers.ResourceManager

interface ErrorProcessor {

    fun logError(tag: String, error: String)

    /**
     * @param networkErrorCustomHandler обработчик сетевых ошибок
     * @param defaultErrorCustomHandler обработчик любых ошибок
     * @param onErrorText текстовое представление ошибки
     *
     * [onErrorText] не будет вызвано, если один из обработчиков обработал ошибку.
     * Обработка ошибки прекращается, когда первый обработчик возвращает true. [networkErrorCustomHandler] является приоритетным обработчиком.
     */
    fun processError(
        tag: String,
        throwable: Throwable,
        networkErrorCustomHandler: ((NetworkException) -> Boolean)? = null,
        defaultErrorCustomHandler: ((Throwable) -> Boolean)? = null,
        onErrorText: ((String) -> Unit)? = null
    )
}

class ErrorProcessorImpl internal constructor(private val resourceManager: ResourceManager) : ErrorProcessor {

    override fun logError(tag: String, error: String) {
        Log.e(tag, error)
    }

    override fun processError(
        tag: String,
        throwable: Throwable,
        networkErrorCustomHandler: ((NetworkException) -> Boolean)?,
        defaultErrorCustomHandler: ((Throwable) -> Boolean)?,
        onErrorText: ((String) -> Unit)?
    ) {
        Log.e(tag, throwable.message, throwable)

        //Crashlytics.logException(throwable)

        if (!tryToHandle(throwable, networkErrorCustomHandler, defaultErrorCustomHandler)) {
            if (onErrorText != null) {
                showErrorMessage(throwable, onErrorText)
            }
        }
    }

    private fun tryToHandle(
        throwable: Throwable,
        networkErrorCustomHandler: ((NetworkException) -> Boolean)?,
        defaultErrorCustomHandler: ((Throwable) -> Boolean)?
    ): Boolean {
        return isNetworkExceptionHandled(throwable, networkErrorCustomHandler) || isThrowableHandled(throwable, defaultErrorCustomHandler)
    }

    private fun isNetworkExceptionHandled(throwable: Throwable, handler: ((NetworkException) -> Boolean)?): Boolean {
        return throwable is NetworkException &&
            handler?.invoke(throwable) ?: false
    }

    private fun isThrowableHandled(throwable: Throwable, handler: ((Throwable) -> Boolean)?): Boolean {
        return handler?.invoke(throwable) ?: false
    }

    private fun showErrorMessage(throwable: Throwable, onErrorText: ((String) -> Unit)) {
        val message = when (throwable) {
            is NetworkException -> {
                when (throwable.status) {
                    OK, CANCELLED -> throwable.description
                    UNKNOWN -> resourceManager.getString(R.string.something_went_wrong)
                    INVALID_ARGUMENT -> throwable.description
                    NOT_FOUND -> throwable.description
                    UNIMPLEMENTED -> resourceManager.getString(R.string.error_server_unimplemented)
                    ALREADY_EXISTS -> throwable.description
                    PERMISSION_DENIED -> resourceManager.getString(R.string.error_permission_denied)
                    RESOURCE_EXHAUSTED -> resourceManager.getString(R.string.error_resource_exhausted)
                    INTERNAL -> resourceManager.getString(R.string.error_server_internal_error)
                    LOW_CONNECTION -> resourceManager.getString(R.string.error_connection_low)
                    UNAUTHENTICATED -> resourceManager.getString(R.string.error_unauthorized)
                }
            }
            is ApiException -> {
                when (throwable.statusCode) {
                    /**
                     * https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInStatusCodes
                     */
                    SIGN_IN_CANCELLED -> "Попытка входа отменена пользователем"
                    SIGN_IN_CURRENTLY_IN_PROGRESS -> "Процесс входа уже запущен"
                    SIGN_IN_FAILED -> "Попытка входа с текущей учётной записью не удалась"

                    //TODO https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes
                    SIGN_IN_REQUIRED -> "Необходимо сначала войти в аккаунт Google на устройстве"
                    NETWORK_ERROR -> resourceManager.getString(R.string.error_connection_low)
                    INVALID_ACCOUNT -> "Неверно указано имя пользователя"
                    INTERNAL_ERROR -> resourceManager.getString(R.string.something_went_wrong)
                    else -> resourceManager.getString(R.string.something_went_wrong)
                }
            }
            else -> {
                resourceManager.getString(R.string.something_went_wrong)
            }
            //TODO UnauthorisedTokenException
            //TODO NoTokenException
            //TODO AuthenticationException
        }
        onErrorText.invoke(message)
    }
}