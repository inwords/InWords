package ru.inwords.inwords.game.domain

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import ru.inwords.inwords.game.domain.model.WordModel

data class ListeningData(val levels: List<ListeningLevelData>)

@Parcelize
data class ListeningLevelData(val levelIndex: Int, val ttsWord: WordModel, val correctWord: WordModel, val incorrectWord: WordModel) : Parcelable

fun CardsData.makeListeningData(): ListeningData {
    val cardsData = this

    val ttsWords = cardsData.words.filter { it.isForeign }.toMutableList()
    ttsWords.shuffle()

    val ttsWordsCopy = ttsWords.toMutableList()

    val incorrectAdditionalWords: List<WordModel> = ttsWords.map { wordModel ->
        val found = ttsWordsCopy.find { wordModel.wordTranslationServerId != it.wordTranslationServerId }
        ttsWordsCopy.remove(found)
        found ?: ttsWords.find { wordModel.wordTranslationServerId != it.wordTranslationServerId } ?: ttsWords.first()
    }

    val list = mutableListOf<ListeningLevelData>()
    for (i in 0..ttsWords.lastIndex) {
        val ttsWord = ttsWords[i]
        val incorrectWordForeign = incorrectAdditionalWords[i]

        list.add(ListeningLevelData(i, ttsWord, ttsWord, incorrectWordForeign))
    }

    return ListeningData(list)
}