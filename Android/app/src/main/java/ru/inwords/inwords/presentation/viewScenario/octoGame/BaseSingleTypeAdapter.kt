package ru.inwords.inwords.presentation.viewScenario.octoGame

import android.view.LayoutInflater
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.functions.Consumer
import io.reactivex.subjects.Subject

abstract class BaseSingleTypeAdapter<T : Any, VH : RecyclerView.ViewHolder>
protected constructor(protected val layoutInflater: LayoutInflater,
                      protected val onItemClickListener: Subject<T>)
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
