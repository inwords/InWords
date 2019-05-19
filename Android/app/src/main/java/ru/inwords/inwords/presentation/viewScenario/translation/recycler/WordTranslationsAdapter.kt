package ru.inwords.inwords.presentation.viewScenario.translation.recycler

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class WordTranslationsAdapter(layoutInflater: LayoutInflater, onItemClickedListener: PublishSubject<WordTranslation>) :
        BaseSingleTypeAdapter<WordTranslation, WordTranslationsAdapter.WordViewHolder>(layoutInflater, onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WordViewHolder {
        val v = inflater.inflate(R.layout.list_item_word, parent, false)

        return WordViewHolder(v, onItemClickedListener)
    }

    override fun onBindViewHolder(holder: WordViewHolder, position: Int) {
        val wordTranslation = values[position]
        holder.bind(wordTranslation)
    }

    class WordViewHolder(itemView: View, var onItemClickedListener: Subject<WordTranslation>?) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
        private var wordNativeTextView: TextView = itemView.findViewById(R.id.tv_word_native)
        private var wordForeignTextView: TextView = itemView.findViewById(R.id.tv_word_foreign)
        lateinit var wordTranslation: WordTranslation

        init {
            itemView.setOnClickListener(this)
        }

        fun bind(wordTranslation: WordTranslation) {
            this.wordTranslation = wordTranslation

            wordNativeTextView.text = wordTranslation.wordNative
            wordForeignTextView.text = wordTranslation.wordForeign
        }

        override fun onClick(v: View) {
            onItemClickedListener?.onNext(wordTranslation)
        }
    }
}
