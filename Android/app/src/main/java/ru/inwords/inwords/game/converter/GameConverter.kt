package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseResourceTwoWayConverter
import ru.inwords.inwords.game.data.bean.GameResponse
import ru.inwords.inwords.game.domain.model.Game

class GameConverter : BaseResourceTwoWayConverter<GameResponse, Game>() {
    override fun convert(source: GameResponse): Game {
        return Game(
            gameId = source.gameId,
            title = source.title,
            creator = source.creator,
            gameLevelInfos = source.gameLevelInfos
        )
    }

    override fun reverse(source: Game): GameResponse {
        return GameResponse(
            gameId = source.gameId,
            title = source.title,
            creator = source.creator,
            gameLevelInfos = source.gameLevelInfos
        )
    }
}