package ru.inwords.inwords.presentation.viewScenario.authorisation

data class AuthorisationViewState(
        val status: Status,
        val throwable: Throwable? = null,
        val invalidEmailMessage: String? = null,
        val invalidPasswordMessage: String? = null
) {
    enum class Status {
        LOADING, SUCCESS, ERROR, INVALID_EMAIL, INVALID_PASSWORD, INVALID_INPUT
    }

    companion object {
        private val SUCCESS_STATE = AuthorisationViewState(Status.SUCCESS, null)
        private val LOADING_STATE = AuthorisationViewState(Status.LOADING, null)

        internal fun success(): AuthorisationViewState {
            return SUCCESS_STATE
        }

        internal fun loading(): AuthorisationViewState {
            return LOADING_STATE
        }

        internal fun error(t: Throwable): AuthorisationViewState {
            return AuthorisationViewState(Status.ERROR, t)
        }

        internal fun invalidEmail(invalidEmailMessage: String): AuthorisationViewState {
            return AuthorisationViewState(Status.INVALID_EMAIL, null, invalidEmailMessage, null)
        }

        internal fun invalidPassword(invalidPasswordMessage: String): AuthorisationViewState {
            return AuthorisationViewState(Status.INVALID_PASSWORD, null, invalidPasswordMessage)
        }

        internal fun invalidInput(invalidEmailMessage: String, invalidPasswordMessage: String): AuthorisationViewState {
            return AuthorisationViewState(Status.INVALID_INPUT, null, invalidEmailMessage, invalidPasswordMessage)
        }
    }
}
