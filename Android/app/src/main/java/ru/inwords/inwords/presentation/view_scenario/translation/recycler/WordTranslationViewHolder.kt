package ru.inwords.inwords.presentation.view_scenario.translation.recycler

import android.view.View
import android.widget.TextView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.list_item_word.view.*
import ru.inwords.inwords.core.SelectableViewHolder
import ru.inwords.inwords.data.dto.WordTranslation

class WordTranslationViewHolder(itemView: View,
                                onItemClickedListener: Subject<WordTranslation>?,
                                onSpeakerClickedListener: Subject<WordTranslation>)
    : SelectableViewHolder<WordTranslation>(itemView) {
    private var wordNativeTextView: TextView = itemView.tv_word_native
    private var wordForeignTextView: TextView = itemView.tv_word_foreign

    init {
        onItemClickedListener?.let { listener -> itemView.setOnClickListener { listener.onNext(item) } }
        itemView.speaker_view.setOnClickListener { onSpeakerClickedListener.onNext(item) }
        itemView.setOnLongClickListener { true }
    }

    override fun setActivatedState(isActivated: Boolean) {
        itemView.isActivated = isActivated
    }

    fun bind(wordTranslation: WordTranslation) {
        item = wordTranslation

        wordNativeTextView.text = wordTranslation.wordNative
        wordForeignTextView.text = wordTranslation.wordForeign
    }
}
