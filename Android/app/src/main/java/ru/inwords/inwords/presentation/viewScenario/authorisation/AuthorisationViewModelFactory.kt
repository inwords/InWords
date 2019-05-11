package ru.inwords.inwords.presentation.viewScenario.authorisation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.authorisation.AuthorisationInteractor
import ru.inwords.inwords.presentation.viewScenario.authorisation.login.LoginViewModel
import ru.inwords.inwords.presentation.viewScenario.authorisation.registration.RegistrationViewModel
import javax.inject.Inject

class AuthorisationViewModelFactory @Inject
internal constructor(private val authorisationInteractor: AuthorisationInteractor) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(RegistrationViewModel::class.java) -> RegistrationViewModel(authorisationInteractor) as T
            modelClass.isAssignableFrom(LoginViewModel::class.java) -> LoginViewModel(authorisationInteractor) as T
            
            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
