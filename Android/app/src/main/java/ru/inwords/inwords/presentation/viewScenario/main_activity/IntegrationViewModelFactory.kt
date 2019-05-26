package ru.inwords.inwords.presentation.viewScenario.main_activity

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import javax.inject.Inject

class IntegrationViewModelFactory @Inject
internal constructor(private val integrationInteractor: IntegrationInteractor) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(IntegrationViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return IntegrationViewModel(integrationInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
