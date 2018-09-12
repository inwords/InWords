package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

import java.util.List;

import io.reactivex.Single;

@Dao
public interface UserDao {
    @Insert
    long insert(User user);

    @Query("DELETE FROM user_table")
    int deleteAll();

    @Query("SELECT * from user_table ORDER BY userName ASC")
    Single<List<User>> getUsers();
}
