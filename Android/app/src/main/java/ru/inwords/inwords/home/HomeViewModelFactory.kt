package ru.inwords.inwords.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Inject

class HomeViewModelFactory @Inject
internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val profileInteractor: ProfileInteractor,
    private val policyInteractor: PolicyInteractor,
    private val trainingInteractor: TrainingInteractor,
    private val resourceManager: ResourceManager
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(translationWordsInteractor, profileInteractor, policyInteractor, trainingInteractor, resourceManager) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
