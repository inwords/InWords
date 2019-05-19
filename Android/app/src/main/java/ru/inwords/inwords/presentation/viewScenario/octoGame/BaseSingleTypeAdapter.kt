package ru.inwords.inwords.presentation.viewScenario.octoGame

import android.util.Pair
import android.view.LayoutInflater
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.functions.Consumer
import io.reactivex.subjects.Subject
import java.util.*

abstract class BaseSingleTypeAdapter<T : Any, VH : RecyclerView.ViewHolder>
protected constructor(values: List<T>,
                      protected val inflater: LayoutInflater,
                      protected var onItemClickedListener: Subject<T>)
    : RecyclerView.Adapter<VH>(), Consumer<Pair<List<T>, DiffUtil.DiffResult>> {

    var values: List<T> protected set

    init {
        this.values = values
    }

    protected constructor(layoutInflater: LayoutInflater,
                          onItemClickedListener: Subject<T>) : this(ArrayList<T>(), layoutInflater, onItemClickedListener)

    override fun accept(pair: Pair<List<T>, DiffUtil.DiffResult>) {
        this.values = pair.first
        pair.second.dispatchUpdatesTo(this)
    }

    override fun getItemCount(): Int {
        return values.size
    }
}
