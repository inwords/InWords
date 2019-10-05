package ru.inwords.inwords.game.presentation.games.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.recycler.RxDiffUtil
import ru.inwords.inwords.core.recycler.SimpleDiffUtilCallback
import ru.inwords.inwords.game.domain.model.GameInfoModel

class GameInfoModelsDiffUtilCallback internal constructor(oldGameLevels: List<GameInfoModel>,
                                                          newGameLevels: List<GameInfoModel>) :
        SimpleDiffUtilCallback<GameInfoModel>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: GameInfoModel, newItem: GameInfoModel): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: GameInfoModel, newItem: GameInfoModel): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldGameInfoModels: List<GameInfoModel>, newGameInfoModels: List<GameInfoModel>): GameInfoModelsDiffUtilCallback {
            return GameInfoModelsDiffUtilCallback(oldGameInfoModels, newGameInfoModels)
        }
    }
}

fun Observable<List<GameInfoModel>>.applyDiffUtil(): Observable<Pair<List<GameInfoModel>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
            .compose(RxDiffUtil.calculate { old, new -> GameInfoModelsDiffUtilCallback(old, new) })
}
