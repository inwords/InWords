package com.dreamproject.inwords.presentation.viewScenario.octoGame.games.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import com.dreamproject.inwords.R
import com.dreamproject.inwords.data.dto.game.GameInfo
import com.dreamproject.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter
import io.reactivex.subjects.Subject

class GamesAdapter(layoutInflater: LayoutInflater, onItemClickedListener: Subject<GameInfo>) :
        BaseSingleTypeAdapter<GameInfo, GameInfoViewHolder>(layoutInflater, onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameInfoViewHolder {
        val v = inflater.inflate(R.layout.game_info, parent, false)

        return GameInfoViewHolder(v, onItemClickedListener)
    }

    override fun onBindViewHolder(holder: GameInfoViewHolder, position: Int) {
        holder.bind(values[position])
    }
}
