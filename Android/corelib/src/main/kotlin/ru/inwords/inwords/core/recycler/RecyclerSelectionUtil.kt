package ru.inwords.inwords.core.recycler

import android.view.MotionEvent
import android.view.View
import androidx.recyclerview.selection.ItemDetailsLookup
import androidx.recyclerview.selection.ItemKeyProvider
import androidx.recyclerview.widget.RecyclerView

class SelectionKeyProvider<T : Any>(private val keyProvider: (position: Int) -> T?,
                                    private val positionProvider: (key: T) -> Int) :
        ItemKeyProvider<T>(SCOPE_CACHED) {
    override fun getKey(position: Int) = keyProvider(position)
    override fun getPosition(key: T) = positionProvider(key)
}

class SelectionDetailsLookup<T : Any>(private val recyclerView: RecyclerView) : ItemDetailsLookup<T>() {
    override fun getItemDetails(e: MotionEvent) = recyclerView.findChildViewUnder(e.x, e.y)
            ?.let {
                @Suppress("UNCHECKED_CAST")
                (recyclerView.getChildViewHolder(it) as? ViewHolderWithDetails<T>)?.getItemDetail()
            }
}

class SelectionDetails<T : Any>(private val adapterPosition: Int,
                                private val selectedKey: T?) :
        ItemDetailsLookup.ItemDetails<T>() {
    override fun getSelectionKey() = selectedKey
    override fun getPosition() = adapterPosition
}

interface ViewHolderWithDetails<T> {
    fun getItemDetail(): ItemDetailsLookup.ItemDetails<T>
}

abstract class SelectableViewHolder<T : Any>(itemView: View) : RecyclerView.ViewHolder(itemView), ViewHolderWithDetails<T> {
    lateinit var item: T

    override fun getItemDetail() = SelectionDetails(adapterPosition, item)

    abstract fun setActivatedState(isActivated: Boolean)
}