package ru.inwords.inwords.data.source.database.game

import androidx.room.*
import io.reactivex.Single
import ru.inwords.inwords.data.dto.game.LevelScoreRequest

@Dao
interface LevelScoreRequestDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(levelScoreRequest: LevelScoreRequest): Single<Long>

    @Delete
    fun deleteAll(levelScoreRequests: List<LevelScoreRequest>): Single<Int>

    @Query("DELETE FROM level_score_request_table")
    fun deleteAll(): Single<Int>

    @Query("DELETE FROM level_score_request_table WHERE levelId IN (:levelIds)")
    fun deleteAllIds(levelIds: List<Int>): Single<Int>

    @Query("SELECT * from level_score_request_table")
    fun getAllScores(): Single<List<LevelScoreRequest>>
}