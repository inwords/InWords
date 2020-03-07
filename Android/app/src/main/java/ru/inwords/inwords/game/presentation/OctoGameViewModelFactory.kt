package ru.inwords.inwords.game.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.data.repository.SettingsRepository
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.presentation.custom_game.CustomGameCreatorViewModel
import ru.inwords.inwords.game.presentation.game_level.GameLevelViewModel
import ru.inwords.inwords.game.presentation.game_levels.GameLevelsViewModel
import ru.inwords.inwords.game.presentation.games.GamesViewModel
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class OctoGameViewModelFactory @Inject
internal constructor(private val gameInteractor: GameInteractor,
                     private val continueGameInteractor: ContinueGameInteractor,
                     private val ttsRepository: TtsRepository,
                     private val settingsRepository: SettingsRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(GameLevelViewModel::class.java) -> GameLevelViewModel(gameInteractor, continueGameInteractor, ttsRepository, settingsRepository) as T
            modelClass.isAssignableFrom(GameLevelsViewModel::class.java) -> GameLevelsViewModel(gameInteractor) as T
            modelClass.isAssignableFrom(GamesViewModel::class.java) -> GamesViewModel(gameInteractor) as T
            modelClass.isAssignableFrom(CustomGameCreatorViewModel::class.java) -> CustomGameCreatorViewModel(gameInteractor) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
