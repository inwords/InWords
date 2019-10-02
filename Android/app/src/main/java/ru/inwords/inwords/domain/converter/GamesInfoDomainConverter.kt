package ru.inwords.inwords.domain.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.domain.model.GamesInfoModel

class GamesInfoDomainConverter : BaseResourceOneWayConverter<List<GameInfo>, GamesInfoModel>() {
    private val gamesInfoDomainConverter = GameInfoDomainConverter()

    override fun convertSuccess(source: List<GameInfo>): GamesInfoModel {
        return GamesInfoModel(true, gamesInfoDomainConverter.convertList(source))
    }
}