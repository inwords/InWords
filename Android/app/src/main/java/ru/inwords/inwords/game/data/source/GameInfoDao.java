package ru.inwords.inwords.game.data.source;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.game.data.entity.GameInfoEntity;

@Dao
public abstract class GameInfoDao implements GameEntityDao<GameInfoEntity> {
    @Query("SELECT * FROM game_info_table")
    public abstract Single<List<GameInfoEntity>> getAll();

    @Query("SELECT * FROM game_info_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<GameInfoEntity> getById(int gameId);
}
