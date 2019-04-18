package ru.inwords.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import java.io.Serializable

@Entity(tableName = "game_table")
data class Game(
        @PrimaryKey
        @SerializedName("gameId") val gameId: Int,
        @SerializedName("title") val title: String?,
        @SerializedName("creator") val creator: String,
        @SerializedName("levelInfos") val gameLevelInfos: List<GameLevelInfo>) : Serializable

val emptyGame get() = Game(0, "", "", emptyList())