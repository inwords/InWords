package ru.inwords.inwords.authorisation.presentation.login

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Single
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.presentation.login.SignInWithGoogle.GoogleSignedInData
import ru.inwords.inwords.authorisation.validators.UserCredentialsValidationState
import ru.inwords.inwords.authorisation.validators.validateUserCredentials
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.SingleLiveEvent
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class LoginViewModel(
    private val authorisationInteractor: AuthorisationInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val authorisationStateLiveData = SingleLiveEvent<AuthorisationViewState>()
    val authorisationState: LiveData<AuthorisationViewState> = authorisationStateLiveData

    private val validationMutableLiveData = MutableLiveData<UserCredentialsValidationState>()
    val validationLiveData: LiveData<UserCredentialsValidationState> get() = validationMutableLiveData

    fun onNavigateToRegistrationClicked(onTopOfRegistration: Boolean) {
        navigateToRegistration(onTopOfRegistration)
    }

    fun onSignInClicked(googleSignedInData: GoogleSignedInData) {
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

    private fun navigateToRegistration(onTopOfRegistration: Boolean) {
        if (onTopOfRegistration) {
            navigateTo(LoginFragmentDirections.actionLoginFragmentToRegistrationFragmentPop())
        } else {
            navigateTo(LoginFragmentDirections.actionLoginFragmentToRegistrationFragment(true))
        }
    }

    fun popOutOfAuth() {
        navigateTo(LoginFragmentDirections.actionGlobalPopToMainFragment())
    }

    companion object {
        const val TAG = "LoginViewModel"
    }
}
