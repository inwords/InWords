package ru.inwords.inwords.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize

@Parcelize
data class GameInfoModel(
        val gameId: Int,
        val creatorId: Int,
        val description: String,
        val title: String,
        val available: Boolean,
        val isCustom: Boolean = false) : Parcelable