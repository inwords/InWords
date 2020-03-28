package ru.inwords.inwords.game.data.bean

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "game_info_table")
data class GameInfoEntity(
    @PrimaryKey
    val gameId: Int,
    val creatorId: Int,
    val description: String?,
    val title: String?,
    val available: Boolean
)