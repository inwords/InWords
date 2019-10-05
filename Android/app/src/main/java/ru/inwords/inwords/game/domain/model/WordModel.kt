package ru.inwords.inwords.game.domain.model

import ru.inwords.inwords.translation.data.bean.WordTranslation

/**
 * Для разложения [WordTranslation] на слова [word], с сохранением [wordTranslationServerId]
 */
data class WordModel(
    val wordTranslationServerId: Int,
    val word: String
)