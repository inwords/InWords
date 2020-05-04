package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.proto.classic_card_game.CardGameInfos

class LevelMetricEntityToCardGameInfoConverter : BaseOneWayConverter<LevelMetricEntity, CardGameInfos.CardGameInfo>() {
    override fun convert(source: LevelMetricEntity): CardGameInfos.CardGameInfo {
        return CardGameInfos.CardGameInfo.newBuilder()
            .putAllWordIdOpenCount(source.wordTranslationIdOpenCount)
            .build()
    }
}