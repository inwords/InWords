package ru.inwords.inwords.game.presentation.games.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import io.reactivex.subjects.Subject
import ru.inwords.inwords.R
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.presentation.BaseSingleTypeAdapter

class GamesAdapter(onItemClickedListener: Subject<GameInfoModel>) :
        BaseSingleTypeAdapter<GameInfoModel, GameInfoViewHolder>(onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameInfoViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.game_info, parent, false)

        return GameInfoViewHolder(v, onItemClickListener)
    }

    override fun onBindViewHolder(holder: GameInfoViewHolder, position: Int) {
        holder.bind(items[position])
    }
}
