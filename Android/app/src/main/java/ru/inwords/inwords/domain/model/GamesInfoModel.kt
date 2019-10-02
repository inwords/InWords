package ru.inwords.inwords.domain.model

import ru.inwords.inwords.domain.interactor.game.GameInfoModel
import java.io.Serializable

data class GamesInfoModel(val shouldShowIntro: Boolean,
                          val gameInfos:List<GameInfoModel>) : Serializable
