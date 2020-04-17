package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.game.domain.model.GamesInfo

class GamesInfoDomainConverter : BaseResourceOneWayConverter<List<GameInfo>, GamesInfo>() {
    override fun convert(source: List<GameInfo>): GamesInfo {
        return GamesInfo(true, source)
    }
}