package ru.inwords.inwords.presentation.view_scenario.home.recycler

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject

class CreateAccountViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
        RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.CreateAccountMarker) {
        itemView.setOnClickListener { onItemClickListener.onNext(item) }
    }
}