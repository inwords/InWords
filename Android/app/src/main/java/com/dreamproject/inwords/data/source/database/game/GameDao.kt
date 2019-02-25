package com.dreamproject.inwords.data.source.database.game

import androidx.room.*
import com.dreamproject.inwords.data.dto.game.Game
import io.reactivex.Single

@Dao
interface GameDao {
    @Query("SELECT * FROM game_table ORDER BY title ASC")
    fun getAll(): Single<List<Game>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(games: List<Game>): Single<List<Long>>

    @Delete
    fun deleteAll(games: List<Game>): Single<Int>
}
