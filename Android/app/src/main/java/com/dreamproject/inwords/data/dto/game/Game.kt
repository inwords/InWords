package com.dreamproject.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import java.io.Serializable

@Entity(tableName = "game_table", indices = [Index("gameId", unique = true)])
data class Game(
        @PrimaryKey
        @SerializedName("gameID") val gameId: Int,
        @SerializedName("title") val title: String,
        @SerializedName("creator") val creator: String,
        @SerializedName("levelInfos") val gameLevelInfos: List<GameLevelInfo>) : Serializable