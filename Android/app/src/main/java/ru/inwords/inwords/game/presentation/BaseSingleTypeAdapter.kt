package ru.inwords.inwords.game.presentation

import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.functions.Consumer

abstract class BaseSingleTypeAdapter<T : Any, VH : RecyclerView.ViewHolder>
protected constructor(protected val onItemClickListener: (T) -> Unit)
    : RecyclerView.Adapter<VH>(), Consumer<Pair<List<T>, DiffUtil.DiffResult>> {

    var items: List<T> = emptyList()
        protected set

    override fun accept(pair: Pair<List<T>, DiffUtil.DiffResult>) {
        this.items = pair.first
        pair.second.dispatchUpdatesTo(this)
    }

    override fun getItemCount(): Int {
        return items.size
    }
}
