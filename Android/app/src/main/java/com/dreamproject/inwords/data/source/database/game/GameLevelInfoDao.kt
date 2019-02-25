package com.dreamproject.inwords.data.source.database.game

import androidx.room.*
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import io.reactivex.Single

@Dao
interface GameLevelInfoDao {
    @Query("SELECT * FROM game_level_info_table")
    fun getAll(): Single<List<GameLevelInfo>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(games: List<GameLevelInfo>): Single<List<Long>>

    @Delete
    fun deleteAll(games: List<GameLevelInfo>): Single<Int>
}
