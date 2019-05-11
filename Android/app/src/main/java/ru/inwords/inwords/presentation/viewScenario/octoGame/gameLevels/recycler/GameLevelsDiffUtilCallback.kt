package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler

import ru.inwords.inwords.core.ObjectsUtil
import ru.inwords.inwords.core.SimpleDiffUtilCallback
import ru.inwords.inwords.data.dto.game.GameLevelInfo

class GameLevelsDiffUtilCallback private constructor(oldGameLevels: List<GameLevelInfo>,
                                                     newGameLevels: List<GameLevelInfo>) :
        SimpleDiffUtilCallback<GameLevelInfo>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameLevelInfo, newItem: GameLevelInfo): Boolean {
        return ObjectsUtil.equals(oldItem.levelId, newItem.levelId)
    }

    override fun areContentsTheSame(oldItem: GameLevelInfo, newItem: GameLevelInfo): Boolean {
        return ObjectsUtil.equals(oldItem, newItem)
    }

    companion object {
        fun create(oldGameLevels: List<GameLevelInfo>,
                   newGameLevels: List<GameLevelInfo>): GameLevelsDiffUtilCallback {
            return GameLevelsDiffUtilCallback(oldGameLevels, newGameLevels)
        }
    }
}
