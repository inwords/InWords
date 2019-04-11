package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import com.dreamproject.inwords.R
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter
import io.reactivex.subjects.Subject

class GameLevelsAdapter(layoutInflater: LayoutInflater, onItemClickedListener: Subject<GameLevelInfo>) :
        BaseSingleTypeAdapter<GameLevelInfo, GameLevelViewHolder>(layoutInflater, onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameLevelViewHolder {
        val v = inflater.inflate(R.layout.game_level_info, parent, false)

        return GameLevelViewHolder(v, onItemClickedListener)
    }

    override fun onBindViewHolder(holder: GameLevelViewHolder, position: Int) {
        holder.bind(values[position])
    }
}
