package ru.inwords.inwords.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.training.domain.TrainingInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Inject

class HomeViewModelFactory @Inject
internal constructor(private val translationWordsInteractor: TranslationWordsInteractor,
                     private val profileInteractor: ProfileInteractor,
                     private val integrationInteractor: IntegrationInteractor,
                     private val trainingInteractor: TrainingInteractor,
                     private val resourceManager: ResourceManager) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(translationWordsInteractor, profileInteractor, integrationInteractor, trainingInteractor, resourceManager) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
