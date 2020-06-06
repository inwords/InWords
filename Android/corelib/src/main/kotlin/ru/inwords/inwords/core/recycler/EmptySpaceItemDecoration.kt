package ru.inwords.inwords.core.recycler

import android.graphics.Rect
import android.view.View
import androidx.recyclerview.widget.RecyclerView

class EmptySpaceItemDecoration(
    private val verticalSpaceHeight: Int = 0,
    private val horizontalSpaceHeight: Int = 0
) : RecyclerView.ItemDecoration() {
    override fun getItemOffsets(outRect: Rect, view: View, parent: RecyclerView, state: RecyclerView.State) {
        outRect.bottom = verticalSpaceHeight
        outRect.right = horizontalSpaceHeight
    }
}