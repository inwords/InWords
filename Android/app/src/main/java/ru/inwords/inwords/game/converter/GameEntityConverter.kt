package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseResourceTwoWayConverter
import ru.inwords.inwords.game.data.entity.GameEntity
import ru.inwords.inwords.game.domain.model.Game

class GameEntityConverter : BaseResourceTwoWayConverter<GameEntity, Game>() {
    override fun convert(source: GameEntity): Game {
        return Game(
            gameId = source.gameId,
            gameLevelInfos = source.gameLevelInfos
        )
    }

    override fun reverse(source: Game): GameEntity {
        return GameEntity(
            gameId = source.gameId,
            gameLevelInfos = source.gameLevelInfos
        )
    }
}