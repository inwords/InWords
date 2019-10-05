package ru.inwords.inwords.game.domain.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.game.data.bean.Game
import ru.inwords.inwords.game.domain.model.GameModel

class GameDomainConverter : BaseResourceOneWayConverter<Game, GameModel>() {
    override fun convertSuccess(source: Game): GameModel {
        return GameModel(true, source)
    }
}