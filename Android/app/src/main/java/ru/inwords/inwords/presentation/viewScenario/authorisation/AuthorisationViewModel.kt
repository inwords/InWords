package ru.inwords.inwords.presentation.viewScenario.authorisation

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.data.dto.UserCredentials
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel
import java.util.concurrent.TimeUnit

abstract class AuthorisationViewModel protected constructor(protected var authorisationInteractor: AuthorisationInteractor) : BasicViewModel() {
    private val authorisationStateLiveData = MutableLiveData<Event<AuthorisationViewState>>()
    private val navigateToLiveData = MutableLiveData<Event<Boolean>>()

    val authorisationState: LiveData<Event<AuthorisationViewState>> = authorisationStateLiveData
    val navigateTo: LiveData<Event<Boolean>> = navigateToLiveData

    fun onNavigateHandler(clicksObservable: Observable<Any>) {
        clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .subscribe { navigateToLiveData.postValue(Event(true)) }
                .autoDispose()
    }

    fun onSignHandler(clicksObservable: Observable<Any>, userCredentialsObservable: Observable<UserCredentials>) {
        clicksObservable
                .debounce(200, TimeUnit.MILLISECONDS)
                .doOnNext { authorisationStateLiveData.postValue(Event(AuthorisationViewState.loading())) }
                .switchMap { userCredentialsObservable }
                .subscribe { userCredentials ->
                    if (validateInput(userCredentials)) {
                        compositeDisposable.add(performAuthAction(userCredentials)
                                .subscribe({ authorisationStateLiveData.postValue(Event(AuthorisationViewState.success())) },
                                        { t -> authorisationStateLiveData.postValue(Event(AuthorisationViewState.error(t))) }))
                    }
                }.autoDispose()
    }

    protected abstract fun performAuthAction(userCredentials: UserCredentials): Completable

    private fun validateInput(userCredentials: UserCredentials): Boolean {
        val emailError = validateEmail(userCredentials)
        val passwordError = validatePassword(userCredentials)

        when {
            emailError != null && passwordError != null -> {
                authorisationStateLiveData.postValue(Event(AuthorisationViewState.invalidInput(emailError, passwordError)))
            }
            emailError != null -> {
                authorisationStateLiveData.postValue(Event(AuthorisationViewState.invalidEmail(emailError)))
            }
            passwordError != null -> {
                authorisationStateLiveData.postValue(Event(AuthorisationViewState.invalidPassword(passwordError)))
            }
        }

        return emailError == null && passwordError == null
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