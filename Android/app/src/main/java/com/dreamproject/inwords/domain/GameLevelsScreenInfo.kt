package com.dreamproject.inwords.domain

import java.io.Serializable

data class GameLevelsScreenInfo(val shouldShowIntro: Boolean,
                                val gameLevelsInfo: List<GameLevelInfo>) : Serializable
