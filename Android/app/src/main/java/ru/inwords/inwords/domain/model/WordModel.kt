package ru.inwords.inwords.domain.model

import ru.inwords.inwords.data.dto.WordTranslation

/**
 * Для разложения [WordTranslation] на слова [word], с сохранением [wordTranslationServerId]
 */
data class WordModel(
    val wordTranslationServerId: Int,
    val word: String
)