package com.dreamproject.inwords.domain.model

import com.dreamproject.inwords.data.dto.game.Game
import java.io.Serializable

data class GameModel(val shouldShowIntro: Boolean,
                     val gameResource: Resource<Game>) : Serializable
