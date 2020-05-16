package ru.inwords.inwords.game.presentation.games

import ru.inwords.inwords.game.domain.model.GamePathToLevel

enum class SimpleState {
    READY, LOADING, ERROR
}

sealed class SimpleStateWithVisibility {
    data class Visible(val state: SimpleState) : SimpleStateWithVisibility()
    object Gone : SimpleStateWithVisibility()
}

sealed class GamePathToLevelState {
    data class Ready(val path: GamePathToLevel) : GamePathToLevelState()
    object GameEnd : GamePathToLevelState()
    object Loading : GamePathToLevelState()
    object Error : GamePathToLevelState()
}