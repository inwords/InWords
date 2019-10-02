package ru.inwords.inwords.domain.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.data.repository.game.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.domain.interactor.game.GameInfoModel

class GameInfoDomainConverter : BaseOneWayConverter<GameInfo, GameInfoModel>() {
    override fun convert(source: GameInfo): GameInfoModel {
        return GameInfoModel(
                gameId = source.gameId,
                creatorId = source.creatorId,
                description = source.description,
                title = source.title, //TODO change title with resource manager
                available = source.available,
                isCustom = source.gameId == CUSTOM_GAME_ID
        )
    }
}