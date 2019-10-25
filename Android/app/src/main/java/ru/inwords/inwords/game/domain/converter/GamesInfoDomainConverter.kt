package ru.inwords.inwords.game.domain.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.game.data.bean.GameInfo
import ru.inwords.inwords.game.domain.model.GamesInfoModel

class GamesInfoDomainConverter(resourceManager: ResourceManager) : BaseResourceOneWayConverter<List<GameInfo>, GamesInfoModel>() {
    private val gamesInfoDomainConverter = GameInfoDomainConverter(resourceManager)

    override fun convertSuccess(source: List<GameInfo>): GamesInfoModel {
        return GamesInfoModel(true, gamesInfoDomainConverter.convertList(source))
    }
}