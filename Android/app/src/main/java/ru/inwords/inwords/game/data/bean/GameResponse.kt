package ru.inwords.inwords.game.data.bean

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_table")
data class GameResponse(
    @PrimaryKey
    @SerializedName("gameId") val gameId: Int,
    @SerializedName("levelInfos") val gameLevelInfos: List<GameLevelInfo>
)