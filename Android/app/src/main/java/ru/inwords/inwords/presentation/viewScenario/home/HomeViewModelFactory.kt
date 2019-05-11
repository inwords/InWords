package ru.inwords.inwords.presentation.viewScenario.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.profile.ProfileInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import javax.inject.Inject

class HomeViewModelFactory @Inject
internal constructor(private val translationWordsInteractor: TranslationWordsInteractor,
                     private val profileInteractor: ProfileInteractor) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return HomeViewModel(translationWordsInteractor, profileInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
