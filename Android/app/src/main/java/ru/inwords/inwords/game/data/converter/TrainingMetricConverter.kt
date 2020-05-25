package ru.inwords.inwords.game.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.game.converter.LevelMetricConverter
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity
import ru.inwords.inwords.game.domain.model.TrainingMetric

class TrainingMetricConverter(private val levelMetricConverter: LevelMetricConverter) : BaseOneWayConverter<TrainingMetric, TrainingMetricEntity>() {
    override fun convert(source: TrainingMetric): TrainingMetricEntity {
        return TrainingMetricEntity(
            levelId = source.levelId,
            audioMetric = levelMetricConverter.convert(source.audioMetric),
            closedCardsMetric = levelMetricConverter.convert(source.closedCardsMetric)
        )
    }
}