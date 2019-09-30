package ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevels.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.RxDiffUtil
import ru.inwords.inwords.core.SimpleDiffUtilCallback
import ru.inwords.inwords.data.dto.game.GameLevelInfo

class GameLevelsDiffUtilCallback internal constructor(oldGameLevels: List<GameLevelInfo>,
                                                      newGameLevels: List<GameLevelInfo>) :
        SimpleDiffUtilCallback<GameLevelInfo>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameLevelInfo, newItem: GameLevelInfo): Boolean {
        return oldItem.levelId == newItem.levelId
    }

    override fun areContentsTheSame(oldItem: GameLevelInfo, newItem: GameLevelInfo): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldGameLevels: List<GameLevelInfo>, newGameLevels: List<GameLevelInfo>): GameLevelsDiffUtilCallback {
            return GameLevelsDiffUtilCallback(oldGameLevels, newGameLevels)
        }
    }
}

fun Observable<List<GameLevelInfo>>.applyDiffUtil(): Observable<Pair<List<GameLevelInfo>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
            .compose(RxDiffUtil.calculate { old, new -> GameLevelsDiffUtilCallback(old, new) })
}