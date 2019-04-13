package com.dreamproject.inwords.presentation.viewScenario.octoGame.games.recycler

import com.dreamproject.inwords.core.ObjectsUtil
import com.dreamproject.inwords.core.SimpleDiffUtilCallback
import com.dreamproject.inwords.data.dto.game.GameInfo

class GameInfosDiffUtilCallback private constructor(oldGameLevels: List<GameInfo>,
                                                    newGameLevels: List<GameInfo>) :
        SimpleDiffUtilCallback<GameInfo>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return ObjectsUtil.equals(oldItem, newItem)
    }

    override fun areContentsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return ObjectsUtil.equals(oldItem, newItem)
    }

    companion object {
        fun create(oldGameInfos: List<GameInfo>,
                   newGameInfos: List<GameInfo>): GameInfosDiffUtilCallback {
            return GameInfosDiffUtilCallback(oldGameInfos, newGameInfos)
        }
    }
}
