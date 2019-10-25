package ru.inwords.inwords.game.domain.model

import ru.inwords.inwords.game.data.bean.Game
import java.io.Serializable

data class GameModel(
        val shouldShowIntro: Boolean,
        val game: Game
) : Serializable
