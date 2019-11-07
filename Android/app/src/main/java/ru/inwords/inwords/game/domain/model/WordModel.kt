package ru.inwords.inwords.game.domain.model

import ru.inwords.inwords.translation.data.bean.WordTranslation
import java.io.Serializable

/**
 * Для разложения [WordTranslation] на слова [word], с сохранением [wordTranslationServerId]
 */
data class WordModel(
    val wordTranslationServerId: Int,
    val isForeign: Boolean,
    val word: String
) : Serializable