package ru.inwords.inwords.game.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "game_info_table")
data class GameInfoEntity(
    @PrimaryKey
    val gameId: Int,
    val description: String,
    val title: String,
    val picture: String,
    val available: Boolean
)