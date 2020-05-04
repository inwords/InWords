package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.domain.model.LevelScore
import ru.inwords.inwords.proto.classic_card_game.LevelPoints

class LevelPointConverter : BaseOneWayConverter<LevelPoints.LevelPoint, LevelScore>() {
    override fun convert(source: LevelPoints.LevelPoint): LevelScore {
        return LevelScore(
            levelId = source.levelId,
            score = source.score
        )
    }
}