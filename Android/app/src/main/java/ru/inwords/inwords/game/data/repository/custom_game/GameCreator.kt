package ru.inwords.inwords.game.data.repository.custom_game

import ru.inwords.inwords.game.domain.model.GameLevelInfo
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface GameCreator {
    fun createLevel(wordTranslations: List<WordTranslation>): GameLevelInfo
}