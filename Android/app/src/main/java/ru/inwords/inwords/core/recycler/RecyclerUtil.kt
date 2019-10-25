package ru.inwords.inwords.core.recycler

import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

fun fixOverscrollBehaviour(recyclerView: RecyclerView) { //TODO think
    recyclerView.post {
        val notAllVisible = (recyclerView.layoutManager as LinearLayoutManager)
                .findLastCompletelyVisibleItemPosition() <
                (recyclerView.adapter?.itemCount ?: 0) - 1
        recyclerView.overScrollMode = if (notAllVisible) View.OVER_SCROLL_ALWAYS else View.OVER_SCROLL_NEVER
    }
}