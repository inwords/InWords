package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

import com.dreamproject.inwords.data.dto.User;

import java.util.List;

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
