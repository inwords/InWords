package ru.inwords.inwords.game.data.bean

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_info_table")
data class GameInfoResponse(
    @PrimaryKey
    @SerializedName("gameId") val gameId: Int,
    @SerializedName("creatorId") val creatorId: Int,
    @SerializedName("description") val description: String?,
    @SerializedName("title") val title: String?,
    @SerializedName("isAvaliable") val available: Boolean
)