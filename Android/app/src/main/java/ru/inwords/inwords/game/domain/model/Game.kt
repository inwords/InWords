package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import java.io.Serializable

@Parcelize
data class Game(
    val gameId: Int,
    val gameLevelInfos: List<GameLevelInfo>
) : Serializable, Parcelable