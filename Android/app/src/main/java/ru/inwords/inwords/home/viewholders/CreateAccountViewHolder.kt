package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.home.recycler.CardWrapper

class CreateAccountViewHolder(itemView: View, private val onItemClickListener: (CardWrapper) -> Unit) :
    RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.CreateAccountMarker) {
        itemView.setOnClickListener { onItemClickListener.invoke(item) }
    }
}