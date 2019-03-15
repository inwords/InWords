package com.dreamproject.inwords.data.source.database.game;

import com.dreamproject.inwords.data.dto.game.Game;

import java.util.List;

import androidx.room.Dao;
import androidx.room.Query;
import io.reactivex.Single;

@Dao
public abstract class GameDao implements GameEntityDao<Game> {
    @Query("SELECT * FROM game_table ORDER BY title ASC")
    public abstract Single<List<Game>> getAll();

    @Query("SELECT * FROM game_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<Game> getById(int gameId);
}
