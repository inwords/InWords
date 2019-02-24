package com.dreamproject.inwords.data.source.database;

import com.dreamproject.inwords.data.dto.User;

import java.util.List;

import androidx.room.Dao;
import androidx.room.Insert;
import androidx.room.Query;
import io.reactivex.Flowable;


@Dao
public interface UserDao {
    @Insert
    long insert(User user);

    @Query("DELETE FROM user_table")
    int deleteAll();

    @Query("SELECT * from user_table ORDER BY userName ASC")
    Flowable<List<User>> getUsers();
}
