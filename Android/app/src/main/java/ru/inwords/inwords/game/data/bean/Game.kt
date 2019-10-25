package ru.inwords.inwords.game.data.bean

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_table")
data class Game(
        @PrimaryKey
        @SerializedName("gameId") val gameId: Int,
        @SerializedName("title") val title: String?,
        @SerializedName("creator") val creator: String,
        @SerializedName("levelInfos") val gameLevelInfos: List<GameLevelInfo>)