package ru.inwords.inwords.authorisation.presentation.registration

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Single
import ru.inwords.inwords.R
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.AuthorisationViewState
import ru.inwords.inwords.authorisation.validators.UserCredentialsWithConfirmationValidationState
import ru.inwords.inwords.authorisation.validators.validateUserCredentialsWithConfirmation
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.validation.ValidationResult
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.profile.data.bean.UserCredentials

class RegistrationViewModel(
    private val authorisationInteractor: AuthorisationInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {
    private val authorisationStateLiveData = MutableLiveData<Event<AuthorisationViewState>>()
    private val navigateToLiveData = MutableLiveData<Event<Unit>>()

    val authorisationState: LiveData<Event<AuthorisationViewState>> = authorisationStateLiveData
    val navigateTo: LiveData<Event<Unit>> = navigateToLiveData

    private val validationMutableLiveData = MutableLiveData<UserCredentialsWithConfirmationValidationState>()
    val validationLiveData: LiveData<UserCredentialsWithConfirmationValidationState> get() = validationMutableLiveData

    fun onNavigateClicked() {
        navigateToLiveData.postValue(Event(Unit))
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
            authorisationStateLiveData.value = Event(AuthorisationViewState.loading())

            authorisationInteractor.signUp(userCredentials)
                .andThen(Single.just(AuthorisationViewState.success()))
                .onErrorResumeNext { Single.just(AuthorisationViewState.error(it)) }
                .subscribe({
                    authorisationStateLiveData.postValue(Event(it))
                }, {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                })
                .autoDispose()
        }
    }
}