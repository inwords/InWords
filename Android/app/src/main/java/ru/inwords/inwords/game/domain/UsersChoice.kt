package ru.inwords.inwords.game.domain

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import ru.inwords.inwords.game.domain.model.WordModel

@Parcelize
data class UsersChoice(val listeningLevelData: ListeningLevelData, val chosenWord: WordModel) : Parcelable {
    fun isCorrect() = chosenWord == listeningLevelData.correctWord
}