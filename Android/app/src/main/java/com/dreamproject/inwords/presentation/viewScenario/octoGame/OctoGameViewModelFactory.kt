package com.dreamproject.inwords.presentation.viewScenario.octoGame

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel.GameLevelViewModel
import com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.GameLevelsViewModel
import com.dreamproject.inwords.presentation.viewScenario.octoGame.games.GamesViewModel
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

            else -> throw IllegalArgumentException("Unknown ViewModel class")
        }
    }
}
