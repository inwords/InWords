package ru.inwords.inwords.home.viewholders

import android.view.View
import android.widget.Button
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.home.recycler.CardWrapper

class WordsTrainingViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
    RecyclerView.ViewHolder(itemView) {
    private val actionButton = itemView.findViewById<Button>(R.id.action_button_1)

    fun bind(item: CardWrapper.WordsTrainingMarker) {
        actionButton.setOnClickListener { onItemClickListener.onNext(item) }
    }
}