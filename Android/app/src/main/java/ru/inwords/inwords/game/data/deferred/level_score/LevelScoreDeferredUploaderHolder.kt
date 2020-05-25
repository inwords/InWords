package ru.inwords.inwords.game.data.deferred.level_score

import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderActions
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity
import ru.inwords.inwords.game.domain.model.TrainingScore

class LevelScoreDeferredUploaderHolder internal constructor(
    private val levelScoreDeferredUploaderFactory: LevelScoreDeferredUploaderFactory
) : DeferredUploaderActions<TrainingMetricEntity, TrainingScore, List<TrainingScore>> by levelScoreDeferredUploaderFactory.create()
