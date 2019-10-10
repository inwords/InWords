package ru.inwords.inwords.presentation.view_scenario.authorisation

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

abstract class AuthorisationViewModel protected constructor(protected var authorisationInteractor: AuthorisationInteractor) : BasicViewModel() {
    private val authorisationStateLiveData = MutableLiveData<Event<AuthorisationViewState>>()
    private val navigateToLiveData = MutableLiveData<Event<Unit>>()

    val authorisationState: LiveData<Event<AuthorisationViewState>> = authorisationStateLiveData
    val navigateTo: LiveData<Event<Unit>> = navigateToLiveData

    fun onNavigateClicked() {
        navigateToLiveData.postValue(Event(Unit))
    }

    fun onSignClicked(userCredentialsObservable: Observable<UserCredentials>) {
        authorisationStateLiveData.value = Event(AuthorisationViewState.loading())

        userCredentialsObservable
            .flatMapSingle { userCredentials ->
                val validationErrorViewState = validateInput(userCredentials)

                if (validationErrorViewState != null) {
                    Single.just(validationErrorViewState)
                } else {
                    performAuthAction(userCredentials)
                        .andThen(Single.just(AuthorisationViewState.success()))
                        .onErrorResumeNext { Single.just(AuthorisationViewState.error(it)) }
                }
            }
            .subscribe {
                authorisationStateLiveData.postValue(Event(it))
            }
            .autoDispose()
    }

    protected abstract fun performAuthAction(userCredentials: UserCredentials): Completable

    private fun validateInput(userCredentials: UserCredentials): AuthorisationViewState? {
        val emailError = validateEmail(userCredentials)
        val passwordError = validatePassword(userCredentials)

        return when {
            emailError != null && passwordError != null -> {
                AuthorisationViewState.invalidInput(emailError, passwordError)
            }
            emailError != null -> {
                AuthorisationViewState.invalidEmail(emailError)
            }
            passwordError != null -> {
                AuthorisationViewState.invalidPassword(passwordError)
            }

            else -> null
        }
    }

    private fun validateEmail(userCredentials: UserCredentials): String? {
        return if (userCredentials.email.length < 3) {
            "Invalid email"
        } else null
    }

    private fun validatePassword(userCredentials: UserCredentials): String? {
        return if (userCredentials.password.isEmpty()) {
            "Invalid password"
        } else null
    }
}