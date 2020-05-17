package ru.inwords.inwords.main_activity.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.authorisation.domain.interactor.AuthorisationInteractor
import ru.inwords.inwords.main_activity.domain.interactor.IntegrationInteractor
import javax.inject.Inject

class IntegrationViewModelFactory @Inject
internal constructor(
    private val authorisationInteractor: AuthorisationInteractor,
    private val integrationInteractor: IntegrationInteractor
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(IntegrationViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return IntegrationViewModel(authorisationInteractor, integrationInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
