package ru.inwords.inwords.game.data.repository.custom_game

import ru.inwords.inwords.game.domain.model.Game

fun Game.withUpdatedLevelScore(levelId: Int, newScore: Int): Game {
    val newGameLevelInfos = gameLevelInfos.map {
        if (it.levelId == levelId) {
            it.copy(playerStars = newScore)
        } else {
            it
        }
    }

    return copy(gameLevelInfos = newGameLevelInfos)
}