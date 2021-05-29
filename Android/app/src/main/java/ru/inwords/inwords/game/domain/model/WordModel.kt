package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import ru.inwords.inwords.translation.domain.model.WordTranslation
import java.io.Serializable

/**
 * Для разложения [WordTranslation] на слова [word], с сохранением [wordTranslationServerId]
 */
@Parcelize
data class WordModel(
    val wordTranslationServerId: Int,
    val isForeign: Boolean,
    val word: String
) : Serializable, Parcelable