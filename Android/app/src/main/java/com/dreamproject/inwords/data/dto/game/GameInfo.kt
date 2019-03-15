package com.dreamproject.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_info_table")
data class GameInfo(
        @PrimaryKey
        @SerializedName("gameId") val gameId: Int,
        @SerializedName("title") val title: String,
        @SerializedName("isAvaliable") val available: Boolean)