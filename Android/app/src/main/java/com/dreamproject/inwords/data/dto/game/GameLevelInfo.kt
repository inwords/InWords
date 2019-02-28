package com.dreamproject.inwords.data.dto.game

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class GameLevelInfo(
        @SerializedName("levelID") val levelId: Int,
        @SerializedName("title") val title: String,
        @SerializedName("level") val level: Int,
        @SerializedName("totalStars") val totalStars: Int,
        @SerializedName("playerStars") val playerStars: Int,
        @SerializedName("successStars") val minStarsToUnlock: Int,
        @SerializedName("isAvailable") val available: Boolean) : Serializable