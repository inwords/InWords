package ru.inwords.inwords.home.viewholders

import android.view.View
import android.widget.Button
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.R
import ru.inwords.inwords.home.recycler.CardWrapper
import ru.inwords.inwords.home.recycler.SimpleState.*

class WordsTrainingViewHolder(itemView: View, private val onItemClickListener: (CardWrapper) -> Unit) :
    RecyclerView.ViewHolder(itemView) {
    private val actionButton = itemView.findViewById<Button>(R.id.action_button_1)

    fun bind(item: CardWrapper.WordsTrainingModel) {
        when (item.state) {
            READY -> {
                actionButton.setText(R.string.start_game_button_text)
                actionButton.isEnabled = true
            }
            LOADING -> {
                actionButton.setText(R.string.exercise_loading)
                actionButton.isEnabled = false
            }
            ERROR -> {
                actionButton.setText(R.string.try_again)
                actionButton.isEnabled = true
            }
        }

        actionButton.setOnClickListener { onItemClickListener.invoke(item) }
    }
}