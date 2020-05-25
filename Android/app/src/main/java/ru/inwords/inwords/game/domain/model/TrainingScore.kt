package ru.inwords.inwords.game.domain.model

data class TrainingScore(
    val levelId: Int,
    val score: Int,
    val audioScore: Int,
    val closedGameScore: Int
)