package ru.inwords.inwords.presentation.view_scenario.octo_game.games.recycler

import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.game_level_info.view.*
import ru.inwords.inwords.data.dto.game.GameInfo

class GameInfoViewHolder internal
constructor(itemView: View, private val onItemClickedListener: Subject<GameInfo>?) :
        RecyclerView.ViewHolder(itemView), View.OnClickListener {

    private val title: TextView = itemView.title

    private lateinit var gameInfo: GameInfo

    init {
        itemView.setOnClickListener(this)
    }

    fun bind(gameInfo: GameInfo) {
        this.gameInfo = gameInfo

        title.text = gameInfo.title
    }

    override fun onClick(v: View) {
        onItemClickedListener?.onNext(gameInfo)
    }
}
