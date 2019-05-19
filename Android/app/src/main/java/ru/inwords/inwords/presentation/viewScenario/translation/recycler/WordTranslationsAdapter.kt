package ru.inwords.inwords.presentation.viewScenario.translation.recycler

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.list_item_word.view.*
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class WordTranslationsAdapter(layoutInflater: LayoutInflater,
                              onItemClickedListener: Subject<WordTranslation>,
                              private val onSpeakerClickedListener: Subject<WordTranslation>) :
        BaseSingleTypeAdapter<WordTranslation, WordTranslationsAdapter.WordViewHolder>(layoutInflater, onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WordViewHolder {
        val v = inflater.inflate(R.layout.list_item_word, parent, false)

        return WordViewHolder(v, onItemClickedListener, onSpeakerClickedListener)
    }

    override fun onBindViewHolder(holder: WordViewHolder, position: Int) {
        val wordTranslation = values[position]
        holder.bind(wordTranslation)
    }

    class WordViewHolder(itemView: View,
                         onItemClickedListener: Subject<WordTranslation>?,
                         onSpeakerClickedListener: Subject<WordTranslation>)
        : RecyclerView.ViewHolder(itemView) {

        private var wordNativeTextView: TextView = itemView.tv_word_native
        private var wordForeignTextView: TextView = itemView.tv_word_foreign
        lateinit var wordTranslation: WordTranslation

        init {
            onItemClickedListener?.let { listener -> itemView.setOnClickListener { listener.onNext(wordTranslation) } }
            itemView.speaker_view.setOnClickListener { onSpeakerClickedListener.onNext(wordTranslation) }
        }

        fun bind(wordTranslation: WordTranslation) {
            this.wordTranslation = wordTranslation

            wordNativeTextView.text = wordTranslation.wordNative
            wordForeignTextView.text = wordTranslation.wordForeign
        }
    }
}
