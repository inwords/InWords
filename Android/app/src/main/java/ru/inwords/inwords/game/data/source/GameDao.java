package ru.inwords.inwords.game.data.source;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.game.data.entity.GameEntity;

@Dao
public abstract class GameDao implements GameEntityDao<GameEntity> {
    @Query("SELECT * FROM game_table")
    public abstract Single<List<GameEntity>> getAll();

    @Query("SELECT * FROM game_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<GameEntity> getById(int gameId);
}
