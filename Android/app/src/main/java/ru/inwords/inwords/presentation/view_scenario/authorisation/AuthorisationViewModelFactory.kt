package ru.inwords.inwords.presentation.view_scenario.authorisation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.view_scenario.authorisation.login.LoginViewModel
import ru.inwords.inwords.presentation.view_scenario.authorisation.registration.RegistrationViewModel
import javax.inject.Inject

class AuthorisationViewModelFactory @Inject
internal constructor(
    private val authorisationInteractor: AuthorisationInteractor,
    private val resourceManager: ResourceManager
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(RegistrationViewModel::class.java) -> RegistrationViewModel(authorisationInteractor, resourceManager) as T
            modelClass.isAssignableFrom(LoginViewModel::class.java) -> LoginViewModel(authorisationInteractor, resourceManager) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
