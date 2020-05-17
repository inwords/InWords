package ru.inwords.inwords.game.presentation.games.recycler

import android.view.View
import com.xwray.groupie.Item
import com.xwray.groupie.viewbinding.BindableItem
import ru.inwords.inwords.R
import ru.inwords.inwords.databinding.CardContinueGameBinding
import ru.inwords.inwords.game.presentation.games.GamePathToLevelState
import ru.inwords.inwords.game.presentation.games.GamePathToLevelState.*

class ContinueGameItem internal constructor(
    private val gamePathToLevelState: GamePathToLevelState,
    private val onItemClickedListener: () -> Unit
) : BindableItem<CardContinueGameBinding>(0), View.OnClickListener {

    override fun onClick(v: View) {
        onItemClickedListener.invoke()
    }

    override fun bind(viewBinding: CardContinueGameBinding, position: Int) {
        when (gamePathToLevelState) {
            is Ready -> {
                viewBinding.progress.visibility = View.GONE
                viewBinding.wordsetName.visibility = View.VISIBLE
                viewBinding.continueGameButton.isEnabled = true
                viewBinding.wordsetName.text = gamePathToLevelState.path.gameInfo.title
            }
            GameEnd -> {

            }
            Loading -> {
                viewBinding.continueGameButton.isEnabled = false
                viewBinding.wordsetName.visibility = View.INVISIBLE
                viewBinding.progress.visibility = View.VISIBLE
            }
            Error -> {
            }
        }

        viewBinding.continueGameButton.setOnClickListener(this)
    }

    override fun getLayout() = R.layout.card_continue_game
    override fun initializeViewBinding(view: View): CardContinueGameBinding = CardContinueGameBinding.bind(view)

    override fun hasSameContentAs(other: Item<*>): Boolean {
        return (other as? ContinueGameItem)?.gamePathToLevelState == gamePathToLevelState
    }
}
