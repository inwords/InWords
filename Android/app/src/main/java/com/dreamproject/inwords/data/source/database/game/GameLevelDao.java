package com.dreamproject.inwords.data.source.database.game;

import com.dreamproject.inwords.data.dto.game.GameLevel;

import java.util.List;

import androidx.room.Dao;
import androidx.room.Query;
import io.reactivex.Single;

@Dao
public abstract class GameLevelDao implements GameEntityDao<GameLevel> {
    @Query("SELECT * FROM game_level_table")
    public abstract Single<List<GameLevel>> getAll();

    @Query("SELECT * FROM game_level_table WHERE levelId = :levelId LIMIT 1")
    public abstract Single<GameLevel> getById(int levelId);
}
