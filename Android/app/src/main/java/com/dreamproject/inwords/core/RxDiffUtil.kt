package com.dreamproject.inwords.core

import android.util.Pair
import androidx.recyclerview.widget.DiffUtil
import io.reactivex.ObservableTransformer

object RxDiffUtil { //TODO remove annotations later
    fun <T> calculate(itemDiffer: (@JvmSuppressWildcards List<T>, @JvmSuppressWildcards List<T>) -> DiffUtil.Callback):
            ObservableTransformer<List<T>, Pair<List<T>, DiffUtil.DiffResult>> {
        val seedPair = Pair<List<T>, DiffUtil.DiffResult>(emptyList(), null)

        return ObservableTransformer { upstream ->
            upstream.scan(seedPair) { oldPair, nextItems ->
                val callback = itemDiffer(oldPair.first, nextItems)
                val result = DiffUtil.calculateDiff(callback, true)
                Pair(nextItems, result)
            }
                    .skip(1)
        }  // downstream shouldn't receive seedPair.
    }
}
