package ru.inwords.inwords.presentation.view_scenario.policy

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import javax.inject.Inject

class PolicyViewModelFactory @Inject
internal constructor(private val integrationInteractor: IntegrationInteractor) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(PolicyViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return PolicyViewModel(integrationInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
