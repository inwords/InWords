package ru.inwords.inwords.game.converter

import ru.inwords.inwords.R
import ru.inwords.inwords.core.BaseResourceTwoWayConverter
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.game.data.bean.GameInfoEntity
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.domain.model.GameInfo

class GameInfoConverter(private val resourceManager: ResourceManager) : BaseResourceTwoWayConverter<GameInfoEntity, GameInfo>() {
    override fun convert(source: GameInfoEntity): GameInfo { //TODO check userId on customGames
        val title = source.title ?: resourceManager.getString(R.string.custom_game)

        return GameInfo(
            gameId = source.gameId,
            creatorId = source.creatorId,
            description = source.description?.trim().orEmpty(), //TODO description of custom game
            title = title,
            available = source.available,
            isCustom = source.gameId == CUSTOM_GAME_ID
        )
    }

    override fun reverse(source: GameInfo): GameInfoEntity {
        return GameInfoEntity(
            gameId = source.gameId,
            creatorId = source.creatorId,
            description = source.description,
            title = source.title,
            available = source.available
        )
    }
}