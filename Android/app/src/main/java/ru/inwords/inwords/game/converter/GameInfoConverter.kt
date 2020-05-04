package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseResourceTwoWayConverter
import ru.inwords.inwords.game.data.entity.GameInfoEntity
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.domain.model.GameInfo

class GameInfoConverter : BaseResourceTwoWayConverter<GameInfoEntity, GameInfo>() {
    override fun convert(source: GameInfoEntity): GameInfo {
        return GameInfo(
            gameId = source.gameId,
            description = source.description.trim(),
            title = source.title,
            picture = source.picture,
            available = source.available,
            isCustom = source.gameId == CUSTOM_GAME_ID
        )
    }

    override fun reverse(source: GameInfo): GameInfoEntity {
        return GameInfoEntity(
            gameId = source.gameId,
            description = source.description,
            title = source.title,
            picture = source.picture,
            available = source.available
        )
    }
}