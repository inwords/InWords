package ru.inwords.inwords.game.domain.model

import java.io.Serializable

data class Game(
    val gameId: Int,
    val gameLevelInfos: List<GameLevelInfo>
) : Serializable