package ru.inwords.inwords.domain.model

import ru.inwords.inwords.data.dto.game.Game
import java.io.Serializable

data class GameModel(val shouldShowIntro: Boolean,
                     val gameResource: Resource<Game>) : Serializable
