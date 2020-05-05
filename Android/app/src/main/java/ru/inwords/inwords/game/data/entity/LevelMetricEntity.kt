package ru.inwords.inwords.game.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "level_metric_table")
data class LevelMetricEntity(
    @PrimaryKey(autoGenerate = true) val levelId: Int,
    val wordTranslationIdOpenCount: Map<Int, Int>
)