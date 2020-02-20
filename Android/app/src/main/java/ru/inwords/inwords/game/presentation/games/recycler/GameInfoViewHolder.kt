package ru.inwords.inwords.game.presentation.games.recycler

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.game_level_info.view.*
import ru.inwords.inwords.game.domain.model.GameInfoModel

class GameInfoViewHolder internal
constructor(itemView: View, private val onItemClickedListener: ((GameInfoModel) -> Unit)?) :
    RecyclerView.ViewHolder(itemView), View.OnClickListener {

    private val title: TextView = itemView.title

    private lateinit var gameInfo: GameInfoModel

    init {
        itemView.setOnClickListener(this)
    }

    fun bind(gameInfo: GameInfoModel) {
        this.gameInfo = gameInfo

        title.text = gameInfo.title
    }

    override fun onClick(v: View) {
        onItemClickedListener?.invoke(gameInfo)
    }
}
