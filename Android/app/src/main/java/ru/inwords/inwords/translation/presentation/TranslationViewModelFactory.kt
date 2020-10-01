package ru.inwords.inwords.translation.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.presentation.add_edit_word.AddEditWordViewModel
import ru.inwords.inwords.translation.presentation.translation_main.TranslationMainViewModel

class TranslationViewModelFactory internal constructor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val ttsRepository: TtsRepository,
    private val settingsRepository: SettingsRepository,
    private val resourceManager: ResourceManager,
    private val gameCreator: GameCreator
) : ViewModelProvider.Factory {

    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(TranslationMainViewModel::class.java) -> TranslationMainViewModel(translationWordsInteractor, ttsRepository, settingsRepository, gameCreator)
            modelClass.isAssignableFrom(AddEditWordViewModel::class.java) -> AddEditWordViewModel(translationWordsInteractor, resourceManager)
            else -> throw IllegalArgumentException("Unknown ViewModel class")
        } as T
    }
}
