package ru.inwords.inwords.policy.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import javax.inject.Inject

class PolicyViewModelFactory @Inject
internal constructor(private val policyInteractor: PolicyInteractor) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(PolicyViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return PolicyViewModel(policyInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
