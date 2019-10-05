package ru.inwords.inwords.game.domain.model

import java.io.Serializable

data class GamesInfoModel(val shouldShowIntro: Boolean,
                          val gameInfos:List<GameInfoModel>) : Serializable
