package ru.inwords.inwords.game.data.deferred.level_score

import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderActions
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.game.domain.model.LevelScore

class LevelScoreDeferredUploaderHolder internal constructor(
    private val levelScoreDeferredUploaderFactory: LevelScoreDeferredUploaderFactory
) : DeferredUploaderActions<LevelMetricEntity, LevelScore, List<LevelScore>> by levelScoreDeferredUploaderFactory.create()
