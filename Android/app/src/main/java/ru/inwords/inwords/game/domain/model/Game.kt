package ru.inwords.inwords.game.domain.model

import ru.inwords.inwords.game.data.bean.GameLevelInfo
import java.io.Serializable

data class Game(
    val gameId: Int,
    val title: String?,
    val creator: String,
    val gameLevelInfos: List<GameLevelInfo>
) : Serializable