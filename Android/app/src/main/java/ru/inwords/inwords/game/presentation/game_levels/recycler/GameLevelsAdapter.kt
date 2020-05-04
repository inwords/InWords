package ru.inwords.inwords.game.presentation.game_levels.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import ru.inwords.inwords.R
import ru.inwords.inwords.game.domain.model.GameLevelInfo
import ru.inwords.inwords.game.presentation.BaseSingleTypeAdapter

class GameLevelsAdapter(onItemClickedListener: (GameLevelInfo) -> Unit) :
    BaseSingleTypeAdapter<GameLevelInfo, GameLevelViewHolder>(onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameLevelViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.game_level_info, parent, false)

        return GameLevelViewHolder(v, onItemClickListener)
    }

    override fun onBindViewHolder(holder: GameLevelViewHolder, position: Int) {
        holder.bind(items[position])
    }
}
