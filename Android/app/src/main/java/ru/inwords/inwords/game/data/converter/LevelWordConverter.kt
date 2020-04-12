package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.proto.word_set.LevelWord
import ru.inwords.inwords.translation.domain.model.WordTranslation

class LevelWordConverter : BaseOneWayConverter<LevelWord, WordTranslation>() {
    override fun convert(source: LevelWord): WordTranslation {
        return WordTranslation(
            wordForeign = source.foreignWord,
            wordNative = source.nativeWord,
            serverId = source.userWordPairId
        )
    }
}