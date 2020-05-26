package ru.inwords.inwords.game.data.source

import androidx.room.*
import io.reactivex.Single
import ru.inwords.inwords.game.data.entity.TrainingMetricEntity

@Dao
interface TrainingMetricEntityDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(trainingMetricEntity: TrainingMetricEntity): Single<Long>

    @Delete
    fun deleteAll(trainingMetricEntities: List<TrainingMetricEntity>): Single<Int>

    @Query("DELETE FROM training_metric_table")
    fun deleteAll(): Single<Int>

    @Query("DELETE FROM training_metric_table WHERE levelId IN (:levelIds)")
    fun deleteAllIds(levelIds: List<Int>): Single<Int>

    @Query("SELECT * from training_metric_table")
    fun getAllScores(): Single<List<TrainingMetricEntity>>
}