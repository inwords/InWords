package ru.inwords.inwords.domain.model

import java.io.Serializable

data class LevelResultModel(
    val levelId: Int,
    val data: HashMap<WordModel, Int>
) : Serializable