package ru.inwords.inwords.game.presentation.games

import ru.inwords.inwords.game.domain.model.GamePathToLevel

sealed class GamePathToLevelState {
    data class Ready(val path: GamePathToLevel) : GamePathToLevelState()
    object GameEnd : GamePathToLevelState()
    object Loading : GamePathToLevelState()
    object Error : GamePathToLevelState()
}