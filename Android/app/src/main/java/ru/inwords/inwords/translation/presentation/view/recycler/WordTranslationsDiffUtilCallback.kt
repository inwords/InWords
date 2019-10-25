package ru.inwords.inwords.translation.presentation.view.recycler

import androidx.recyclerview.widget.DiffUtil
import io.reactivex.Observable
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.core.recycler.RxDiffUtil
import ru.inwords.inwords.core.recycler.SimpleDiffUtilCallback
import ru.inwords.inwords.translation.data.bean.WordTranslation

class WordTranslationsDiffUtilCallback internal constructor(oldWordTranslations: List<WordTranslation>,
                                                            newWordTranslations: List<WordTranslation>) :
    SimpleDiffUtilCallback<WordTranslation>(oldWordTranslations, newWordTranslations) {

    override fun areItemsTheSame(oldItem: WordTranslation, newItem: WordTranslation): Boolean {
        return (oldItem.wordNative == newItem.wordNative) && (oldItem.wordForeign == newItem.wordForeign)
    }

    override fun areContentsTheSame(oldItem: WordTranslation, newItem: WordTranslation): Boolean {
        return oldItem == newItem
    }

    companion object {
        fun create(oldItems: List<WordTranslation>, newItems: List<WordTranslation>): WordTranslationsDiffUtilCallback {
            return WordTranslationsDiffUtilCallback(oldItems, newItems)
        }
    }
}

fun Observable<List<WordTranslation>>.applyDiffUtil(): Observable<Pair<List<WordTranslation>, DiffUtil.DiffResult>> {
    return observeOn(Schedulers.computation())
        .compose(RxDiffUtil.calculate { old, new -> WordTranslationsDiffUtilCallback(old, new) })
}