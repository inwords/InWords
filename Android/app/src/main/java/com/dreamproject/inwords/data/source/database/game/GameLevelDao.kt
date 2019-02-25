package com.dreamproject.inwords.data.source.database.game

import androidx.room.*
import com.dreamproject.inwords.data.dto.game.GameLevel
import io.reactivex.Single

@Dao
interface GameLevelDao {
    @Query("SELECT * FROM game_level_table")
    fun getAll(): Single<List<GameLevel>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(games: List<GameLevel>): Single<List<Long>>

    @Delete
    fun deleteAll(games: List<GameLevel>): Single<Int>
}
