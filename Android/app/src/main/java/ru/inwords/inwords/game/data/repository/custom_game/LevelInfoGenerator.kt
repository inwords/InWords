package ru.inwords.inwords.game.data.repository.custom_game

import ru.inwords.inwords.game.data.bean.GameLevelInfo

class LevelInfoGenerator {
    fun getNextLevelId(gameLevelInfo: GameLevelInfo?): Int {
        return gameLevelInfo?.levelId?.minus(1) ?: -1
    }

    fun getNextLevelNumber(gameLevelInfo: GameLevelInfo?): Int {
        return gameLevelInfo?.level?.plus(1) ?: 1
    }
}