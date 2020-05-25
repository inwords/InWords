package ru.inwords.inwords.game.data.entity

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.io.Serializable

@Entity(tableName = "training_metric_table")
data class TrainingMetricEntity(
    @PrimaryKey val levelId: Int,
    @Embedded(prefix = "audioMetric_")
    val audioMetric: LevelMetricEntity,
    @Embedded(prefix = "closedCardsMetric_")
    val closedCardsMetric: LevelMetricEntity
) : Serializable