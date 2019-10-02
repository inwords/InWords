package ru.inwords.inwords.data.repository.game.custom_game

import ru.inwords.inwords.data.dto.game.GameLevelInfo

class LevelInfoGenerator {
    fun getNextLevelId(gameLevelInfo: GameLevelInfo?): Int {
        return gameLevelInfo?.levelId?.minus(1) ?: -1
    }

    fun getNextLevelNumber(gameLevelInfo: GameLevelInfo?): Int {
        return gameLevelInfo?.level?.plus(1) ?: 1
    }
}