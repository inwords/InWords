package ru.inwords.inwords.domain.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.domain.model.GameModel

class GameDomainConverter : BaseResourceOneWayConverter<Game, GameModel>() {
    override fun convertSuccess(source: Game): GameModel {
        return GameModel(true, source)
    }
}