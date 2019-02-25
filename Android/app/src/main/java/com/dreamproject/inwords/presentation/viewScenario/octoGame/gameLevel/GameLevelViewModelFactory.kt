package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dreamproject.inwords.data.repository.GameRemoteRepository
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameLevelViewModelFactory @Inject
internal constructor(private val gameRemoteRepository: GameRemoteRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GameLevelViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GameLevelViewModel(gameRemoteRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}
