package com.dreamproject.inwords.presentation.viewScenario.octoGame.games

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GamesViewModelFactory @Inject
internal constructor(private val gameInteractor: GameInteractor) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GamesViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GamesViewModel(gameInteractor) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
