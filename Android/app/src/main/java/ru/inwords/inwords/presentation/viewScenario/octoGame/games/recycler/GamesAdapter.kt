package ru.inwords.inwords.presentation.viewScenario.octoGame.games.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.presentation.viewScenario.octoGame.BaseSingleTypeAdapter

class GamesAdapter(onItemClickedListener: Subject<GameInfo>) :
        BaseSingleTypeAdapter<GameInfo, GameInfoViewHolder>(onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameInfoViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.game_info, parent, false)

        return GameInfoViewHolder(v, onItemClickListener)
    }

    override fun onBindViewHolder(holder: GameInfoViewHolder, position: Int) {
        holder.bind(items[position])
    }
}
