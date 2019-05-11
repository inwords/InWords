package ru.inwords.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "level_score_request_table")
data class LevelScoreRequest(
        @PrimaryKey(autoGenerate = true) val levelId: Int,
        val openingQuantity: Int,
        val wordsCount: Int
)