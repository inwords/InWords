package com.dreamproject.inwords.presentation.viewScenario.main

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dreamproject.inwords.domain.interactor.profile.ProfileInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationSyncInteractor
import com.dreamproject.inwords.domain.interactor.translation.TranslationWordsInteractor
import javax.inject.Inject

class MainViewModelFactory @Inject
internal constructor(private val translationWordsInteractor: TranslationWordsInteractor,
                     private val translationSyncInteractor: TranslationSyncInteractor,
                     private val profileInteractor: ProfileInteractor) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return MainViewModel(translationWordsInteractor, translationSyncInteractor, profileInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
