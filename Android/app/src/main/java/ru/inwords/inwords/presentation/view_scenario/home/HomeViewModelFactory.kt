package ru.inwords.inwords.presentation.view_scenario.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.integration.IntegrationInteractor
import ru.inwords.inwords.profile.domain.interactor.ProfileInteractor
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import javax.inject.Inject

class HomeViewModelFactory @Inject
internal constructor(private val translationWordsInteractor: TranslationWordsInteractor,
                     private val profileInteractor: ProfileInteractor,
                     private val integrationInteractor: IntegrationInteractor) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(translationWordsInteractor, profileInteractor, integrationInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
