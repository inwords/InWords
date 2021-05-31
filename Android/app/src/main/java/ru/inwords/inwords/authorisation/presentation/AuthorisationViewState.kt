package ru.inwords.inwords.authorisation.presentation

data class AuthorisationViewState(
        val status: Status,
        val errorMessage: String? = null
) {
    enum class Status {
        LOADING, SUCCESS, ERROR
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

        internal fun error(errorMessage: String): AuthorisationViewState {
            return AuthorisationViewState(Status.ERROR, errorMessage)
        }
    }
}
