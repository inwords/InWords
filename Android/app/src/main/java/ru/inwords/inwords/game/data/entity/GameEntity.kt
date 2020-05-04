package ru.inwords.inwords.game.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey
import ru.inwords.inwords.game.domain.model.GameLevelInfo

@Entity(tableName = "game_table")
data class GameEntity(
    @PrimaryKey
    val gameId: Int,
    val gameLevelInfos: List<GameLevelInfo>
)