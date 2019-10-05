package ru.inwords.inwords.game.data.source;

import androidx.room.Dao;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.game.data.bean.Game;

@Dao
public abstract class GameDao implements GameEntityDao<Game> {
    @Query("SELECT * FROM game_table ORDER BY title ASC")
    public abstract Single<List<Game>> getAll();

    @Query("SELECT * FROM game_table WHERE gameId = :gameId LIMIT 1")
    public abstract Single<Game> getById(int gameId);
}
