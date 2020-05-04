package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class GameLevelInfo(
    val levelId: Int,
    val level: Int,
    val playerStars: Int,
    val available: Boolean
) : Parcelable