package ru.inwords.inwords.game.presentation.games.recycler

import android.view.LayoutInflater
import android.view.ViewGroup
import ru.inwords.inwords.R
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.game.presentation.BaseSingleTypeAdapter

class GamesAdapter(
    onItemClickedListener: (GameInfo) -> Unit,
    private val onSaveToDictionaryClickedListener: ((GameInfo) -> Unit)?
) : BaseSingleTypeAdapter<GameInfo, GameInfoViewHolder>(onItemClickedListener) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): GameInfoViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.game_info, parent, false)

        return GameInfoViewHolder(v, onItemClickListener, onSaveToDictionaryClickedListener)
    }

    override fun onBindViewHolder(holder: GameInfoViewHolder, position: Int) {
        holder.bind(items[position])
    }
}
