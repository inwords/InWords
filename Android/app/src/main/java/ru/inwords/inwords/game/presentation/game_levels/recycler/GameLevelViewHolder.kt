package ru.inwords.inwords.game.presentation.game_levels.recycler

import android.view.View
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import io.reactivex.subjects.Subject
import kotlinx.android.synthetic.main.game_level_info.view.*
import ru.inwords.inwords.game.data.bean.GameLevelInfo

class GameLevelViewHolder internal
constructor(itemView: View, private val onItemClickedListener: Subject<GameLevelInfo>?) :
        RecyclerView.ViewHolder(itemView), View.OnClickListener {

    private val ratingBar: RatingBar = itemView.rating_bar
    private val title: TextView = itemView.title

    private lateinit var gameLevelInfo: GameLevelInfo

    init {
        itemView.setOnClickListener(this)
    }

    fun bind(gameLevelInfo: GameLevelInfo) {
        this.gameLevelInfo = gameLevelInfo

        title.text = gameLevelInfo.level.toString()
        ratingBar.rating = gameLevelInfo.playerStars.toFloat()
    }

    override fun onClick(v: View) {
        onItemClickedListener?.onNext(gameLevelInfo)
    }
}
