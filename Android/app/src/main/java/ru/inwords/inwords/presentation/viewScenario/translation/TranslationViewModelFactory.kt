package ru.inwords.inwords.presentation.viewScenario.translation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

import ru.inwords.inwords.domain.interactor.translation.TranslationSyncInteractor
import ru.inwords.inwords.domain.interactor.translation.TranslationWordsInteractor
import ru.inwords.inwords.presentation.viewScenario.translation.addEditWord.AddEditWordViewModel
import ru.inwords.inwords.presentation.viewScenario.translation.translationMain.TranslationMainViewModel

import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TranslationViewModelFactory @Inject
internal constructor(private val translationWordsInteractor: TranslationWordsInteractor,
                     private val translationSyncInteractor: TranslationSyncInteractor) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(TranslationMainViewModel::class.java) -> TranslationMainViewModel(translationWordsInteractor, translationSyncInteractor) as T
            modelClass.isAssignableFrom(AddEditWordViewModel::class.java) -> AddEditWordViewModel(translationWordsInteractor, translationSyncInteractor) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }

}
