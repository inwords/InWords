package ru.inwords.inwords.authorisation.presentation.registration

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.presentation.login.LoginViewModel
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.authorisation.validators.UserCredentialsWithConfirmationValidationState
import ru.inwords.inwords.authorisation.validators.validateUserCredentialsWithConfirmation
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.network.error_handler.ErrorProcessor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationViewModel(
    private val authorisationInteractor: AuthorisationInteractor,
    private val errorProcessor: ErrorProcessor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val authorisationStateLiveData = SingleLiveEvent<AuthorisationViewState>()
    val authorisationState: LiveData<AuthorisationViewState> = authorisationStateLiveData

    private val validationMutableLiveData = MutableLiveData<UserCredentialsWithConfirmationValidationState>()
    val validationLiveData: LiveData<UserCredentialsWithConfirmationValidationState> get() = validationMutableLiveData

    fun onNavigateToLoginClicked(onTopOfLogin: Boolean, onTopOfChooseSignMethod: Boolean) {
        navigateToLogin(onTopOfLogin, onTopOfChooseSignMethod)
    }

    fun onSignInClicked(googleSignedInData: SignInWithGoogle.GoogleSignedInData) {
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
        errorProcessor.processError(LoginViewModel.TAG, throwable, onErrorText = {
            authorisationStateLiveData.setValue(AuthorisationViewState.error(it))
        })
    }

    fun onSignClicked(userCredentials: UserCredentials, passwordConfirmation: String) {
        val validationState = validateUserCredentialsWithConfirmation(
            userCredentials,
            passwordConfirmation,
            { resourceManager.getString(R.string.incorrect_input_email) },
            { resourceManager.getString(R.string.incorrect_input_password) },
            { resourceManager.getString(R.string.incorrect_input_password_confirmation) }
        )

        if (
            validationState.emailState is ValidationResult.Error ||
            validationState.passwordState is ValidationResult.Error ||
            validationState.passwordConfirmationState is ValidationResult.Error
        ) {
            validationMutableLiveData.postValue(validationState)
        } else {
            authorisationStateLiveData.setValue(AuthorisationViewState.loading())

            authorisationInteractor.signUp(userCredentials)
                .observeOn(SchedulersFacade.ui())
                .subscribe({
                    authorisationStateLiveData.setValue(AuthorisationViewState.success())
                }, { throwable ->
                    onException(throwable)
                })
                .autoDispose()
        }
    }

    private fun navigateToLogin(onTopOfLogin: Boolean, onTopOfChooseSignMethod: Boolean) {
        if (onTopOfLogin) {
            navigateTo(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragmentPop())
        } else {
            navigateTo(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragment(true, onTopOfChooseSignMethod))
        }
    }

    fun popOutOfAuth(onTopOfLogin: Boolean, onTopOfChooseSignMethod: Boolean) {
        when {
            onTopOfChooseSignMethod -> {
                navigateTo(NavGraphDirections.actionGlobalPopToChooseSignMethodFragmentInclusive())
            }
            onTopOfLogin -> {
                navigateTo(NavGraphDirections.actionGlobalPopToLoginFragmentInclusive())
            }
            else -> {
                navigateTo(NavGraphDirections.actionGlobalPopToRegistrationFragmentInclusive())
            }
        }
    }

    companion object {
        const val TAG = "RegistrationViewModel"
    }
}