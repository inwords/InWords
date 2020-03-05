package ru.inwords.inwords.game.presentation.games.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.recycler.RxDiffUtil
import ru.inwords.inwords.core.recycler.SimpleDiffUtilCallback
import ru.inwords.inwords.game.domain.model.GameInfo

class GameInfoModelsDiffUtilCallback internal constructor(oldGameLevels: List<GameInfo>,
                                                          newGameLevels: List<GameInfo>) :
        SimpleDiffUtilCallback<GameInfo>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return oldItem.gameId == newItem.gameId
    }

    override fun areContentsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldGameInfos: List<GameInfo>, newGameInfos: List<GameInfo>): GameInfoModelsDiffUtilCallback {
            return GameInfoModelsDiffUtilCallback(oldGameInfos, newGameInfos)
        }
    }
}

fun Observable<List<GameInfo>>.applyDiffUtil(): Observable<Pair<List<GameInfo>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
            .compose(RxDiffUtil.calculate { old, new -> GameInfoModelsDiffUtilCallback(old, new) })
}
