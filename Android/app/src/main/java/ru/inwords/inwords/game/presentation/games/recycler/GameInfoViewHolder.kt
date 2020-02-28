package ru.inwords.inwords.game.presentation.games.recycler

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.databinding.GameInfoBinding
import ru.inwords.inwords.game.domain.model.GameInfoModel

class GameInfoViewHolder internal constructor(
    itemView: View, private val onItemClickedListener: ((GameInfoModel) -> Unit)?
) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
    private val binding: GameInfoBinding = GameInfoBinding.bind(itemView)

    private lateinit var gameInfo: GameInfoModel

    init {
        itemView.setOnClickListener(this)
    }

    fun bind(gameInfo: GameInfoModel) {
        this.gameInfo = gameInfo

        binding.title.text = gameInfo.title
    }

    override fun onClick(v: View) {
        onItemClickedListener?.invoke(gameInfo)
    }
}
