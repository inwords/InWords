package ru.inwords.inwords.game.domain.model

import java.io.Serializable

data class TrainingMetric(
    val levelId: Int,
    val audioMetric: LevelMetric,
    val closedCardsMetric: LevelMetric
) : Serializable