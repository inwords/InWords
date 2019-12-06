package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.card_dictionary.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.home.recycler.CardWrapper

class DictionaryViewHolder(itemView: View, private val onItemClickListener: Subject<CardWrapper>) :
    RecyclerView.ViewHolder(itemView) {
    fun bind(item: CardWrapper.DictionaryModel) {
        with(itemView) {
            dictSize.text = if (item.success) {
                context.resources.getQuantityString(R.plurals.words_in_dictionary, item.count, item.count)
            } else {
                context.getString(R.string.error_text_placeholder)
            }

            setOnClickListener { onItemClickListener.onNext(item) }
        }
    }
}