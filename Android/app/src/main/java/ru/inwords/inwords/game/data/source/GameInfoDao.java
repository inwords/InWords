package ru.inwords.inwords.game.data.source;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.game.data.bean.GameInfoResponse;

@Dao
public abstract class GameInfoDao implements GameEntityDao<GameInfoResponse> {
    @Query("SELECT * FROM game_info_table")
    public abstract Single<List<GameInfoResponse>> getAll();

    @Query("SELECT * FROM game_info_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<GameInfoResponse> getById(int gameId);
}
