package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity
import ru.inwords.inwords.proto.word_set.TrainingDataRequest
import ru.inwords.inwords.proto.word_set.TrainingDataRequest.Training.AudioMetric
import ru.inwords.inwords.proto.word_set.TrainingDataRequest.Training.ClosedCardsMetric

class TrainingMetricEntityToCardGameMetricConverter : BaseOneWayConverter<TrainingMetricEntity, TrainingDataRequest.Training>() {
    override fun convert(source: TrainingMetricEntity): TrainingDataRequest.Training {
        return TrainingDataRequest.Training.newBuilder()
            .setGameLevelId(source.levelId)
            .setClosedCardsMetric(ClosedCardsMetric.newBuilder().putAllWordIdOpenCount(source.closedCardsMetric.wordTranslationIdOpenCount))
            .setAudioMetric(AudioMetric.newBuilder().putAllWordIdOpenCount(source.audioMetric.wordTranslationIdOpenCount))
            .build()
    }
}