package ru.inwords.inwords.game.presentation.games.recycler

import android.view.View
import androidx.core.view.isVisible
import androidx.recyclerview.widget.RecyclerView
import ru.inwords.inwords.databinding.GameInfoBinding
import ru.inwords.inwords.game.domain.model.GameInfo

class GameInfoViewHolder internal constructor(
    itemView: View,
    private val onItemClickedListener: ((GameInfo) -> Unit)?,
    private val onSaveToDictionaryClickedListener: ((GameInfo) -> Unit)?
) : RecyclerView.ViewHolder(itemView), View.OnClickListener {
    private val binding: GameInfoBinding = GameInfoBinding.bind(itemView)

    private lateinit var gameInfo: GameInfo

    init {
        binding.actionButton1.setOnClickListener(this)
        binding.saveToDictionary.setOnClickListener {
            onSaveToDictionaryClickedListener?.invoke(gameInfo)
        }
    }

    fun bind(gameInfo: GameInfo) {
        this.gameInfo = gameInfo

        binding.primaryText.text = gameInfo.title
        binding.subText.text = gameInfo.description

        if (gameInfo.loading) {
            binding.saveToDictionary.isVisible = false
            binding.saveToDictionaryLoading.isVisible = true
        } else {
            binding.saveToDictionary.isVisible = true
            binding.saveToDictionaryLoading.isVisible = false
        }
    }

    override fun onClick(v: View) {
        onItemClickedListener?.invoke(gameInfo)
    }
}
