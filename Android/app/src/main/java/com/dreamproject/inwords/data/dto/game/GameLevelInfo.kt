package com.dreamproject.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import java.io.Serializable

@Entity(tableName = "game_level_info_table", indices = [Index("levelId", unique = true)])
data class GameLevelInfo(
        @PrimaryKey
        @SerializedName("levelID") val levelId: Int,
        @SerializedName("title") val title: String,
        @SerializedName("level") val level: Int,
        @SerializedName("totalStars") val totalStars: Int,
        @SerializedName("playerStars") val playerStars: Int,
        @SerializedName("successStars") val minStarsToUnlock: Int,
        @SerializedName("isAvailable") val available: Boolean) : Serializable