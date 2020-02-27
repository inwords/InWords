package ru.inwords.inwords.home.viewholders

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.CardDictionaryBinding
import ru.inwords.inwords.home.recycler.CardWrapper

class DictionaryViewHolder(
    itemView: View, private val onItemClickListener: (CardWrapper) -> Unit
) : RecyclerView.ViewHolder(itemView) {
    private val binding: CardDictionaryBinding = CardDictionaryBinding.bind(itemView)

    fun bind(item: CardWrapper.DictionaryModel) {
        binding.dictSize.text = if (item.success) {
            itemView.context.resources.getQuantityString(R.plurals.words_in_dictionary, item.count, item.count)
        } else {
            itemView.context.getString(R.string.error_text_placeholder)
        }

        binding.root.setOnClickListener { onItemClickListener.invoke(item) }
    }
}