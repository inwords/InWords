package ru.inwords.inwords.game.data.deferred.level_score

import ru.inwords.inwords.core.deferred_uploader.DeferredUploaderActions
import ru.inwords.inwords.game.data.bean.LevelScore
import ru.inwords.inwords.game.data.bean.LevelScoreRequest

class LevelScoreDeferredUploaderHolder internal constructor(
    private val levelScoreDeferredUploaderFactory: LevelScoreDeferredUploaderFactory
) : DeferredUploaderActions<LevelScoreRequest, LevelScore> by levelScoreDeferredUploaderFactory.create()
