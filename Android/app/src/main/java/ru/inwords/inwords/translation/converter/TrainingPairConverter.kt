package ru.inwords.inwords.translation.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.proto.dictionary.TrainingReply
import ru.inwords.inwords.translation.domain.model.WordTranslation

class TrainingPairConverter : BaseOneWayConverter<TrainingReply.TrainingPair, WordTranslation>() {
    override fun convert(source: TrainingReply.TrainingPair): WordTranslation {
        return WordTranslation(
            wordForeign = source.foreignWord,
            wordNative = source.nativeWord,
            serverId = source.userWordPair
        )
    }
}