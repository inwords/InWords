package ru.inwords.inwords.authorisation.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.authorisation.presentation.choose_method.ChooseSignMethodViewModel
import ru.inwords.inwords.authorisation.presentation.login.LoginViewModel
import ru.inwords.inwords.authorisation.presentation.registration.RegistrationViewModel
import ru.inwords.inwords.core.error_handler.ErrorProcessor
import ru.inwords.inwords.core.managers.ResourceManager

class AuthorisationViewModelFactory internal constructor(
    private val authorisationInteractor: AuthorisationInteractor,
    private val errorProcessor: ErrorProcessor,
    private val resourceManager: ResourceManager
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(RegistrationViewModel::class.java) -> RegistrationViewModel(authorisationInteractor, errorProcessor, resourceManager) as T
            modelClass.isAssignableFrom(LoginViewModel::class.java) -> LoginViewModel(authorisationInteractor, errorProcessor, resourceManager) as T
            modelClass.isAssignableFrom(ChooseSignMethodViewModel::class.java) -> ChooseSignMethodViewModel(authorisationInteractor, errorProcessor) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
