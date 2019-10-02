package ru.inwords.inwords.data.repository.game.custom_game

import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.GameLevelInfo

interface GameCreator {
    fun createLevel(wordTranslations: List<WordTranslation>): GameLevelInfo
}