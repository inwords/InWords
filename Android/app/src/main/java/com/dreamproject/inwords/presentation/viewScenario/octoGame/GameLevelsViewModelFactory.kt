package com.dreamproject.inwords.presentation.viewScenario.octoGame

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dreamproject.inwords.data.repository.GameRemoteRepository
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GameLevelsViewModelFactory @Inject
internal constructor(private val gameRemoteRepository: GameRemoteRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GameLevelsViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GameLevelsViewModel(gameRemoteRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
