package com.dreamproject.inwords.data.dto.game

import java.io.Serializable

data class Game(val gameId: Int, val creator: String, val gameLevelInfos: List<GameLevelInfo>) : Serializable