package ru.inwords.inwords.translation.data.deferred.converter

import ru.inwords.inwords.core.BaseTwoWayConverter
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.deferred.WordTranslationValue

class WordTranslationValueConverter : BaseTwoWayConverter<WordTranslation, WordTranslationValue>() {
    override fun reverse(source: WordTranslationValue): WordTranslation {
        return WordTranslation(source.wordForeign, source.wordNative, source.id, source.serverId)
    }

    override fun convert(source: WordTranslation): WordTranslationValue {
        return WordTranslationValue(source.wordForeign, source.wordNative, source.id, source.serverId)
    }
}