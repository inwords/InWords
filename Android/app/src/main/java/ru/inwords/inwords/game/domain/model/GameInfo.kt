package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class GameInfo(
    val gameId: Int,
    val creatorId: Int,
    val description: String,
    val title: String,
    val available: Boolean,
    val isCustom: Boolean = false,
    val loading: Boolean = false
) : Parcelable