package ru.inwords.inwords.data.source.database.game;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.data.dto.game.GameLevel;

@Dao
public abstract class GameLevelDao implements GameEntityDao<GameLevel> {
    @Query("SELECT * FROM game_level_table")
    public abstract Single<List<GameLevel>> getAll();

    @Query("SELECT * FROM game_level_table WHERE levelId = :levelId LIMIT 1")
    public abstract Single<GameLevel> getById(int levelId);
}
