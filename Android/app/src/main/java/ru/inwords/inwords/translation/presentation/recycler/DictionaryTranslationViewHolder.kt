package ru.inwords.inwords.translation.presentation.recycler

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.databinding.ItemDictionaryTranslationBinding
import ru.inwords.inwords.translation.presentation.recycler.DictionaryTranslationViewHolder.State.*

class DictionaryTranslationViewHolder internal constructor(
    itemView: View,
    private val onItemClickedListener: (Params) -> Unit
) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
    data class Params(val text: String, val state: State)
    enum class State { CONTENT, LOADING, ERROR }

    private val binding = ItemDictionaryTranslationBinding.bind(itemView)

    private lateinit var params: Params

    init {
        binding.chip.setOnClickListener(this)
    }

    fun bind(params: Params) {
        this.params = params

        binding.chip.text = params.text

        when (params.state) {
            CONTENT -> binding.chip.isChipIconVisible = true
            LOADING -> binding.chip.isChipIconVisible = false
            ERROR -> binding.chip.isChipIconVisible = false
        }
    }

    override fun onClick(v: View) {
        onItemClickedListener.invoke(params)
    }
}
