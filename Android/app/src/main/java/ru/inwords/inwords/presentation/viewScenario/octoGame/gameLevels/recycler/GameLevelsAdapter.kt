package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class GameLevelsAdapter(onItemClickedListener: Subject<GameLevelInfo>) :
        BaseSingleTypeAdapter<GameLevelInfo, GameLevelViewHolder>(onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameLevelViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.game_level_info, parent, false)

        return GameLevelViewHolder(v, onItemClickListener)
    }

    override fun onBindViewHolder(holder: GameLevelViewHolder, position: Int) {
        holder.bind(items[position])
    }
}
