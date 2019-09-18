package ru.inwords.inwords.presentation.viewScenario.translation.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.selection.SelectionTracker
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class WordTranslationsAdapter(layoutInflater: LayoutInflater,
                              onItemClickedListener: Subject<WordTranslation>,
                              private val onSpeakerClickedListener: Subject<WordTranslation>) :
        BaseSingleTypeAdapter<WordTranslation, WordTranslationViewHolder>(layoutInflater, onItemClickedListener) {

    var tracker: SelectionTracker<WordTranslation>? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WordTranslationViewHolder {
        val v = layoutInflater.inflate(R.layout.list_item_word, parent, false)

        return WordTranslationViewHolder(v, onItemClickListener, onSpeakerClickedListener)
    }

    override fun onBindViewHolder(holder: WordTranslationViewHolder, position: Int) {
        val wordTranslation = items[position]
        holder.bind(wordTranslation)
    }

    override fun onBindViewHolder(holder: WordTranslationViewHolder, position: Int, payloads: List<Any>) {
        tracker?.let { holder.setActivatedState(it.isSelected(items[position])) }

        if (SelectionTracker.SELECTION_CHANGED_MARKER !in payloads) {
            onBindViewHolder(holder, position)
        }
    }
}
