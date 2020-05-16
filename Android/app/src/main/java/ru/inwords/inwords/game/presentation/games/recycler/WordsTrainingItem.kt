package ru.inwords.inwords.game.presentation.games.recycler

import android.view.View
import com.xwray.groupie.Item
import com.xwray.groupie.viewbinding.BindableItem
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.CardTrainingBinding
import ru.inwords.inwords.game.presentation.games.SimpleState
import ru.inwords.inwords.game.presentation.games.SimpleState.*

class WordsTrainingItem internal constructor(
    private val simpleState: SimpleState,
    private val onItemClickListener: () -> Unit
) : BindableItem<CardTrainingBinding>(0), View.OnClickListener {

    override fun onClick(v: View) {
        onItemClickListener.invoke()
    }

    override fun bind(viewBinding: CardTrainingBinding, position: Int) {
        when (simpleState) {
            READY -> {
                viewBinding.actionButton1.setText(R.string.start_game_button_text)
                viewBinding.actionButton1.isEnabled = true
            }
            LOADING -> {
                viewBinding.actionButton1.setText(R.string.exercise_loading)
                viewBinding.actionButton1.isEnabled = false
            }
            ERROR -> {
                viewBinding.actionButton1.setText(R.string.try_again)
                viewBinding.actionButton1.isEnabled = true
            }
        }

        viewBinding.actionButton1.setOnClickListener(this)
    }

    override fun getLayout() = R.layout.card_training
    override fun initializeViewBinding(view: View): CardTrainingBinding = CardTrainingBinding.bind(view)

    override fun isSameAs(other: Item<*>): Boolean {
        return other is WordsTrainingItem
    }

    override fun hasSameContentAs(other: Item<*>): Boolean {
        return (other as? WordsTrainingItem)?.simpleState == simpleState
    }
}