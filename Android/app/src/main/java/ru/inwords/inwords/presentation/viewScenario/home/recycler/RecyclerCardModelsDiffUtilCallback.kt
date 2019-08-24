package ru.inwords.inwords.presentation.viewScenario.home.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.RxDiffUtil
import ru.inwords.inwords.core.SimpleDiffUtilCallback

class RecyclerCardModelsDiffUtilCallback internal constructor(oldGameLevels: List<CardWrapper>,
                                                              newGameLevels: List<CardWrapper>) :
        SimpleDiffUtilCallback<CardWrapper>(oldGameLevels, newGameLevels) {

    override fun areItemsTheSame(oldItem: CardWrapper, newItem: CardWrapper): Boolean {
        return oldItem == newItem
    }

    override fun areContentsTheSame(oldItem: CardWrapper, newItem: CardWrapper): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldItems: List<CardWrapper>, newItems: List<CardWrapper>): RecyclerCardModelsDiffUtilCallback {
            return RecyclerCardModelsDiffUtilCallback(oldItems, newItems)
        }
    }
}

fun Observable<List<CardWrapper>>.applyDiffUtil(): Observable<Pair<List<CardWrapper>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
            .compose(RxDiffUtil.calculate { old, new -> RecyclerCardModelsDiffUtilCallback(old, new) })
}