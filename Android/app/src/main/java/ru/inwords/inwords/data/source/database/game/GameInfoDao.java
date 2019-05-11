package ru.inwords.inwords.data.source.database.game;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.data.dto.game.GameInfo;

@Dao
public abstract class GameInfoDao implements GameEntityDao<GameInfo> {
    @Query("SELECT * FROM game_info_table")
    public abstract Single<List<GameInfo>> getAll();

    @Query("SELECT * FROM game_info_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<GameInfo> getById(int gameId);
}
