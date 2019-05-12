package ru.inwords.inwords.data.source.database.game;

import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;

import java.util.List;

import io.reactivex.Single;

public interface GameEntityDao<T> {
    Single<List<T>> getAll();

    Single<T> getById(int gameId);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Single<List<Long>> insertAll(List<T> values);

    @Delete
    Single<Integer> deleteAll(List<T> values);
}