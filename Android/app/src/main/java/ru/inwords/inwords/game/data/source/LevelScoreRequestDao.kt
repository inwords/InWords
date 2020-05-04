package ru.inwords.inwords.game.data.source

import androidx.room.*
import io.reactivex.Single
import ru.inwords.inwords.game.data.entity.LevelMetricEntity

@Dao
interface LevelScoreRequestDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(levelMetricEntity: LevelMetricEntity): Single<Long>

    @Delete
    fun deleteAll(levelMetricEntities: List<LevelMetricEntity>): Single<Int>

    @Query("DELETE FROM level_metric_table")
    fun deleteAll(): Single<Int>

    @Query("DELETE FROM level_metric_table WHERE levelId IN (:levelIds)")
    fun deleteAllIds(levelIds: List<Int>): Single<Int>

    @Query("SELECT * from level_metric_table")
    fun getAllScores(): Single<List<LevelMetricEntity>>
}