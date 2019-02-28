package com.dreamproject.inwords.data.source.database.game;

import com.dreamproject.inwords.data.dto.game.GameInfo;

import java.util.List;

import androidx.room.Dao;
import androidx.room.Query;
import io.reactivex.Single;

@Dao
public abstract class GameInfoDao implements GameEntityDao<GameInfo> {
    @Query("SELECT * FROM game_info_table")
    public abstract Single<List<GameInfo>> getAll();

    @Query("SELECT * FROM game_info_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<GameInfo> getById(int gameId);
}
