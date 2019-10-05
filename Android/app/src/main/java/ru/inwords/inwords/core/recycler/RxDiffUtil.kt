package ru.inwords.inwords.core.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.ObservableTransformer

object RxDiffUtil { //TODO remove annotations later
    private val emptyDiffResult = DiffUtil.calculateDiff(BasicDiffUtilCallback.create(emptyList(), emptyList()))

    fun <T> calculate(itemDiffer: (@JvmSuppressWildcards List<T>, @JvmSuppressWildcards List<T>) -> DiffUtil.Callback):
            ObservableTransformer<List<T>, Pair<List<T>, DiffUtil.DiffResult>> {

        val seedPair = Pair<List<T>, DiffUtil.DiffResult>(emptyList(), emptyDiffResult)

        return ObservableTransformer { upstream ->
            upstream.scan(seedPair) { oldPair, nextItems ->
                val callback = itemDiffer(oldPair.first, nextItems)
                val result = DiffUtil.calculateDiff(callback, true)
                nextItems to result
            }
                    .skip(1)
        }  // downstream shouldn't receive seedPair.
    }
}
