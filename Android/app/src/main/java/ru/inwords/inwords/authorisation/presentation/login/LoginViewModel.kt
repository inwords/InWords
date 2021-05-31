package ru.inwords.inwords.authorisation.presentation.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle.GoogleSignedInData
import ru.inwords.inwords.authorisation.validators.UserCredentialsValidationState
import ru.inwords.inwords.authorisation.validators.validateUserCredentials
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.network.error_handler.ErrorProcessor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class LoginViewModel(
    private val authorisationInteractor: AuthorisationInteractor,
    private val errorProcessor: ErrorProcessor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val authorisationStateLiveData = SingleLiveEvent<AuthorisationViewState>()
    val authorisationState: LiveData<AuthorisationViewState> = authorisationStateLiveData

    private val validationMutableLiveData = MutableLiveData<UserCredentialsValidationState>()
    val validationLiveData: LiveData<UserCredentialsValidationState> get() = validationMutableLiveData

    fun onNavigateToRegistrationClicked(onTopOfRegistration: Boolean, onTopOfChooseSignMethod: Boolean) {
        navigateToRegistration(onTopOfRegistration, onTopOfChooseSignMethod)
    }

    fun onSignInClicked(googleSignedInData: GoogleSignedInData) {
        authorisationStateLiveData.setValue(AuthorisationViewState.loading())

        authorisationInteractor.signInGoogleAccount(googleSignedInData)
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .subscribe({
                authorisationStateLiveData.setValue(AuthorisationViewState.success())
            }, { throwable ->
                onException(throwable)
            })
            .autoDispose()
    }

    fun onException(throwable: Throwable) {
        errorProcessor.processError(TAG, throwable, onErrorText = {
            authorisationStateLiveData.setValue(AuthorisationViewState.error(it))
        })
    }

    fun onSignInClicked(userCredentials: UserCredentials) {
        val validationState = validateUserCredentials(
            userCredentials,
            { resourceManager.getString(R.string.incorrect_input_email) },
            { resourceManager.getString(R.string.incorrect_input_password) }
        )

        if (validationState.emailState is ValidationResult.Error || validationState.passwordState is ValidationResult.Error) {
            validationMutableLiveData.postValue(validationState)
        } else {
            authorisationStateLiveData.setValue(AuthorisationViewState.loading())

            authorisationInteractor.signIn(userCredentials)
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    authorisationStateLiveData.postValue(AuthorisationViewState.success())
                }, { throwable ->
                    onException(throwable)
                })
                .autoDispose()
        }
    }

    private fun navigateToRegistration(onTopOfRegistration: Boolean, onTopOfChooseSignMethod: Boolean) {
        if (onTopOfRegistration) {
            navigateTo(LoginFragmentDirections.actionLoginFragmentToRegistrationFragmentPop())
        } else {
            navigateTo(LoginFragmentDirections.actionLoginFragmentToRegistrationFragment(true, onTopOfChooseSignMethod))
        }
    }

    fun popOutOfAuth(onTopOfRegistration: Boolean, onTopOfChooseSignMethod: Boolean) {
        when {
            onTopOfChooseSignMethod -> {
                navigateTo(NavGraphDirections.actionGlobalPopToChooseSignMethodFragmentInclusive())
            }
            onTopOfRegistration -> {
                navigateTo(NavGraphDirections.actionGlobalPopToRegistrationFragmentInclusive())
            }
            else -> {
                navigateTo(NavGraphDirections.actionGlobalPopToLoginFragmentInclusive())
            }
        }
    }

    companion object {
        const val TAG = "LoginViewModel"
    }
}
