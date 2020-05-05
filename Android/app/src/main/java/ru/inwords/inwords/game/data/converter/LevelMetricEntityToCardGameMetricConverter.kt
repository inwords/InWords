package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.proto.classic_card_game.CardGameMetrics

class LevelMetricEntityToCardGameMetricConverter : BaseOneWayConverter<LevelMetricEntity, CardGameMetrics.CardGameMetric>() {
    override fun convert(source: LevelMetricEntity): CardGameMetrics.CardGameMetric {
        return CardGameMetrics.CardGameMetric.newBuilder()
            .putAllWordIdOpenCount(source.wordTranslationIdOpenCount)
            .setGameLevelId(source.levelId)
            .build()
    }
}