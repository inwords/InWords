package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class UsersChoice(val listeningLevelData: ListeningLevelData, val chosenWord: WordModel) : Parcelable {
    fun isCorrect() = chosenWord == listeningLevelData.correctWord
}