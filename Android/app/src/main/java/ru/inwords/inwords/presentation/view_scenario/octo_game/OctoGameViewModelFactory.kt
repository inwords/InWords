package ru.inwords.inwords.presentation.view_scenario.octo_game

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.presentation.view_scenario.octo_game.custom_game.CustomGameCreatorViewModel
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel.GameLevelViewModel
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels.GameLevelsViewModel
import ru.inwords.inwords.presentation.view_scenario.octo_game.games.GamesViewModel
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class OctoGameViewModelFactory @Inject
internal constructor(private val gameInteractor: GameInteractor) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        return when {
            modelClass.isAssignableFrom(GameLevelViewModel::class.java) -> GameLevelViewModel(gameInteractor) as T
            modelClass.isAssignableFrom(GameLevelsViewModel::class.java) -> GameLevelsViewModel(gameInteractor) as T
            modelClass.isAssignableFrom(GamesViewModel::class.java) -> GamesViewModel(gameInteractor) as T
            modelClass.isAssignableFrom(CustomGameCreatorViewModel::class.java) -> CustomGameCreatorViewModel(gameInteractor) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
