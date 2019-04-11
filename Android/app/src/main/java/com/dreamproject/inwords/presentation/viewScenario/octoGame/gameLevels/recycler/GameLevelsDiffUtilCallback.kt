package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler

import com.dreamproject.inwords.core.ObjectsUtil
import com.dreamproject.inwords.core.SimpleDiffUtilCallback
import com.dreamproject.inwords.data.dto.game.GameLevelInfo

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
