package ru.inwords.inwords.data.dto.game

import android.os.Parcelable
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Parcelize
data class GameLevelInfo(
        @SerializedName("levelId") val levelId: Int,
        @SerializedName("level") val level: Int,
        @SerializedName("playerStars") val playerStars: Int,
        @SerializedName("isAvailable") val available: Boolean) : Parcelable