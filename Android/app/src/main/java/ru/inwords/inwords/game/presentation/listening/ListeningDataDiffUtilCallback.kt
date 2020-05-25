package ru.inwords.inwords.game.presentation.listening

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.recycler.RxDiffUtil
import ru.inwords.inwords.core.recycler.SimpleDiffUtilCallback
import ru.inwords.inwords.game.domain.ListeningLevelData

class ListeningLevelDataDiffUtilCallback internal constructor(
    oldGameLevels: List<ListeningLevelData>,
    newGameLevels: List<ListeningLevelData>
) : SimpleDiffUtilCallback<ListeningLevelData>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: ListeningLevelData, newItem: ListeningLevelData): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: ListeningLevelData, newItem: ListeningLevelData): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldGameLevels: List<ListeningLevelData>, newGameLevels: List<ListeningLevelData>): ListeningLevelDataDiffUtilCallback {
            return ListeningLevelDataDiffUtilCallback(oldGameLevels, newGameLevels)
        }
    }
}

fun Observable<List<ListeningLevelData>>.applyDiffUtil(): Observable<Pair<List<ListeningLevelData>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
        .compose(RxDiffUtil.calculate { old, new -> ListeningLevelDataDiffUtilCallback.create(old, new) })
}