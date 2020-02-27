package ru.inwords.inwords.translation.presentation.recycler

import android.view.View
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.recycler.SelectableViewHolder
import ru.inwords.inwords.databinding.ListItemWordBinding
import ru.inwords.inwords.translation.data.bean.WordTranslation

class WordTranslationViewHolder(
    itemView: View,
    onItemClickedListener: ((WordTranslation) -> Unit)?,
    onSpeakerClickedListener: Subject<WordTranslation>
) : SelectableViewHolder<WordTranslation>(itemView) {
    private val binding: ListItemWordBinding = ListItemWordBinding.bind(itemView)

    init {
        onItemClickedListener?.let { listener -> itemView.setOnClickListener { listener.invoke(item) } }
        binding.speakerView.setOnClickListener { onSpeakerClickedListener.onNext(item) }
        itemView.setOnLongClickListener { true }
    }

    override fun setActivatedState(isActivated: Boolean) {
        itemView.isActivated = isActivated
    }

    fun bind(wordTranslation: WordTranslation) {
        item = wordTranslation

        binding.tvWordNative.text = wordTranslation.wordNative
        binding.tvWordForeign.text = wordTranslation.wordForeign
    }
}
