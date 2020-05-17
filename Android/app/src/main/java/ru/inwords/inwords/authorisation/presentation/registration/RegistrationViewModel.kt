package ru.inwords.inwords.authorisation.presentation.registration

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Single
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle
import ru.inwords.inwords.authorisation.validators.UserCredentialsWithConfirmationValidationState
import ru.inwords.inwords.authorisation.validators.validateUserCredentialsWithConfirmation
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationViewModel(
    private val authorisationInteractor: AuthorisationInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val authorisationStateLiveData = SingleLiveEvent<AuthorisationViewState>()
    val authorisationState: LiveData<AuthorisationViewState> = authorisationStateLiveData

    private val validationMutableLiveData = MutableLiveData<UserCredentialsWithConfirmationValidationState>()
    val validationLiveData: LiveData<UserCredentialsWithConfirmationValidationState> get() = validationMutableLiveData

    fun onNavigateToLoginClicked(onTopOfLogin: Boolean) {
        navigateToLogin(onTopOfLogin)
    }

    fun onSignInClicked(googleSignedInData: SignInWithGoogle.GoogleSignedInData) {
        authorisationStateLiveData.setValue(AuthorisationViewState.loading())

        authorisationInteractor.signInGoogleAccount(googleSignedInData)
            .subscribeOn(SchedulersFacade.io())
            .andThen(Single.just(AuthorisationViewState.success()))
            .onErrorResumeNext { Single.just(AuthorisationViewState.error(it)) }
            .subscribe({
                authorisationStateLiveData.postValue(it)
            }, {
                Log.e(TAG, it.message.orEmpty())
            })
            .autoDispose()
    }

    fun onException(throwable: Throwable) {
        authorisationStateLiveData.setValue(AuthorisationViewState.error(throwable))
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
                .andThen(Single.just(AuthorisationViewState.success()))
                .onErrorResumeNext { Single.just(AuthorisationViewState.error(it)) }
                .subscribe({
                    authorisationStateLiveData.postValue(it)
                }, {
                    Log.e(TAG, it.message.orEmpty())
                })
                .autoDispose()
        }
    }

    private fun navigateToLogin(onTopOfLogin: Boolean) {
        if (onTopOfLogin) {
            navigateTo(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragmentPop())
        } else {
            navigateTo(RegistrationFragmentDirections.actionRegistrationFragmentToLoginFragment(true))
        }
    }

    fun popOutOfAuth(onTopOfLogin: Boolean) {
        if (onTopOfLogin) {
            navigateTo(NavGraphDirections.actionGlobalPopToLoginFragmentInclusive())
        } else {
            navigateTo(NavGraphDirections.actionGlobalPopToRegistrationFragmentInclusive())
        }
    }

    companion object {
        const val TAG = "RegistrationViewModel"
    }
}