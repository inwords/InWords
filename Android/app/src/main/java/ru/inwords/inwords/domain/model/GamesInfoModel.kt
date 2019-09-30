package ru.inwords.inwords.domain.model

import ru.inwords.inwords.data.dto.game.GameInfo
import java.io.Serializable

data class GamesInfoModel(val shouldShowIntro: Boolean,
                          val gameInfos:List<GameInfo>) : Serializable
