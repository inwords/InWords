package ru.inwords.inwords.game.presentation.game_levels.recycler

import android.view.View
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.databinding.GameLevelInfoBinding
import ru.inwords.inwords.game.domain.model.GameLevelInfo

class GameLevelViewHolder internal constructor(
    itemView: View, private val onItemClickedListener: ((GameLevelInfo) -> Unit)?
) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
    private val binding: GameLevelInfoBinding = GameLevelInfoBinding.bind(itemView)

    private lateinit var gameLevelInfo: GameLevelInfo

    init {
        itemView.setOnClickListener(this)
    }

    fun bind(gameLevelInfo: GameLevelInfo) {
        this.gameLevelInfo = gameLevelInfo

        binding.title.text = gameLevelInfo.level.toString()
        binding.ratingBar.rating = gameLevelInfo.playerStars.toFloat() / 2
    }

    override fun onClick(v: View) {
        onItemClickedListener?.invoke(gameLevelInfo)
    }
}
