package ru.inwords.inwords.game.domain.model

import java.io.Serializable

data class GamesInfo(
    val shouldShowIntro: Boolean,
    val gameInfos: List<GameInfo>
) : Serializable
