package ru.inwords.inwords.presentation.viewScenario.home.recycler

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.card_dictionary.view.*
import ru.inwords.inwords.R

class DictionaryViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
        RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.DictionaryModel) {
        with(itemView) {
            dictSize.text = if (item.success) {
                context.getString(R.string.words_in_dictionary, item.count)
            } else {
                context.getString(R.string.error_text_placeholder)
            }

            setOnClickListener { onItemClickListener.onNext(item) }
        }
    }
}