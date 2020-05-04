package ru.inwords.inwords.game.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey
import ru.inwords.inwords.translation.domain.model.WordTranslation

@Entity(tableName = "game_level_table")
data class GameLevelEntity(
    @PrimaryKey
    val levelId: Int,
    val wordTranslations: List<WordTranslation>
)