package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.game.data.bean.GameInfoEntity
import ru.inwords.inwords.proto.word_set.WordSetReply

class WordSetInfoReplyConverter : BaseResourceOneWayConverter<WordSetReply.WordSetInfo, GameInfoEntity>() {
    override fun convert(source: WordSetReply.WordSetInfo): GameInfoEntity {
        return GameInfoEntity(
            gameId = source.id,
            description = source.description,
            title = source.title,
            picture = source.picture,
            available = true
        )
    }
}