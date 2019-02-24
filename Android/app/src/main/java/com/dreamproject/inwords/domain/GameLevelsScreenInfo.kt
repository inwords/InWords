package com.dreamproject.inwords.domain

import com.dreamproject.inwords.data.dto.game.Game
import java.io.Serializable

data class GameLevelsScreenInfo(val shouldShowIntro: Boolean,
                                val game: Game) : Serializable
