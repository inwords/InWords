package ru.inwords.inwords.translation.presentation.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import ru.inwords.inwords.R
import ru.inwords.inwords.translation.presentation.recycler.DictionaryTranslationViewHolder.Params

class DictionaryTranslationsAdapter(
    private val onItemClickedListener: (Params) -> Unit
) : ListAdapter<Params, DictionaryTranslationViewHolder>(ItemCallback()) {
    class ItemCallback : DiffUtil.ItemCallback<Params>() {
        override fun areItemsTheSame(oldItem: Params, newItem: Params) = oldItem == newItem

        override fun areContentsTheSame(oldItem: Params, newItem: Params) = oldItem == newItem
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DictionaryTranslationViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.item_dictionary_translation, parent, false)

        return DictionaryTranslationViewHolder(v, onItemClickedListener)
    }

    override fun onBindViewHolder(holder: DictionaryTranslationViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}