package com.dreamproject.inwords.data.source.database;

import com.dreamproject.inwords.data.dto.User;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import androidx.room.Transaction;
import io.reactivex.Single;


@Dao
public abstract class UserDao {
    @Query("SELECT * FROM user_table LIMIT 1")
    public abstract Single<User> getAuthorisedUser();

    @Transaction
    public long insert(User user) {
        deleteAll();
        return insertInternal(user);
    }

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    abstract long insertInternal(User user);

    @Query("DELETE FROM user_table")
    abstract void deleteAll();
}
