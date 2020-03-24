package ru.inwords.inwords.translation.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.proto.dictionary.WordReply
import ru.inwords.inwords.translation.domain.model.WordTranslation

class WordTranslationReplyConverter : BaseOneWayConverter<WordReply, WordTranslation>() {
    override fun convert(source: WordReply): WordTranslation {
        return WordTranslation(
            wordForeign = source.wordForeign,
            wordNative = source.wordNative,
            serverId = source.userWordPair
        )
    }
}