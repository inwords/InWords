package ru.inwords.inwords.translation.presentation.recycler

import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.RecyclerView

class ItemTouchHelperAdapter(private val touchHelperEvents: ItemTouchHelperEvents) : ItemTouchHelper.Callback() {
    override fun getMovementFlags(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder): Int {
        val dragFlags = 0//ItemTouchHelper.UP | ItemTouchHelper.DOWN;
        val swipeFlags = ItemTouchHelper.END
        return makeMovementFlags(dragFlags, swipeFlags)
    }

    override fun onMove(recyclerView: RecyclerView, viewHolder: RecyclerView.ViewHolder, viewHolder1: RecyclerView.ViewHolder): Boolean {
        return false
    }

    override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
        touchHelperEvents.onItemDismiss(viewHolder.bindingAdapterPosition)
    }

    override fun isItemViewSwipeEnabled(): Boolean {
        return true
    }
}
