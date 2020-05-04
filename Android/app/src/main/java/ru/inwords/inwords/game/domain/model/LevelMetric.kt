package ru.inwords.inwords.game.domain.model

import java.io.Serializable

data class LevelMetric(
    val levelId: Int,
    val data: HashMap<WordModel, Int>
) : Serializable