package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.domain.model.GameLevelInfo
import ru.inwords.inwords.proto.word_set.LevelReply

class LevelReplyConverter : BaseOneWayConverter<LevelReply, GameLevelInfo>() {
    override fun convert(source: LevelReply): GameLevelInfo {
        return GameLevelInfo(
            levelId = source.levelId,
            level = source.level,
            playerStars = source.stars,
            available = source.isAvailable
        )
    }
}