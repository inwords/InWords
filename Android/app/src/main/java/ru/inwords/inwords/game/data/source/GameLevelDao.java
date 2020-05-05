package ru.inwords.inwords.game.data.source;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.game.data.entity.GameLevelEntity;

@Dao
public abstract class GameLevelDao implements GameEntityDao<GameLevelEntity> {
    @Query("SELECT * FROM game_level_table")
    public abstract Single<List<GameLevelEntity>> getAll();

    @Query("SELECT * FROM game_level_table WHERE levelId = :levelId LIMIT 1")
    public abstract Single<GameLevelEntity> getById(int levelId);
}
