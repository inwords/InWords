package ru.inwords.inwords.presentation.view_scenario.octo_game.games.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.RxDiffUtil
import ru.inwords.inwords.core.SimpleDiffUtilCallback
import ru.inwords.inwords.data.dto.game.GameInfo

class GameInfosDiffUtilCallback internal constructor(oldGameLevels: List<GameInfo>,
                                                     newGameLevels: List<GameInfo>) :
        SimpleDiffUtilCallback<GameInfo>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: GameInfo, newItem: GameInfo): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldGameInfos: List<GameInfo>, newGameInfos: List<GameInfo>): GameInfosDiffUtilCallback {
            return GameInfosDiffUtilCallback(oldGameInfos, newGameInfos)
        }
    }
}

fun Observable<List<GameInfo>>.applyDiffUtil(): Observable<Pair<List<GameInfo>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
            .compose(RxDiffUtil.calculate { old, new -> GameInfosDiffUtilCallback(old, new) })
}
