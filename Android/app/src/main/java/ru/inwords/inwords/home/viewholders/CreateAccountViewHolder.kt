package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import ru.inwords.inwords.home.recycler.CardWrapper

class CreateAccountViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
        RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.CreateAccountMarker) {
        itemView.setOnClickListener { onItemClickListener.onNext(item) }
    }
}