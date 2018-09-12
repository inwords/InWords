package com.dreamproject.inwords.data.entity;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

import java.util.List;

import io.reactivex.Single;

@Dao
public interface WordDao {

    @Insert
    long insert(Word word);

    @Query("DELETE FROM word_table")
    int deleteAll();

    @Query("SELECT * from word_table ORDER BY word ASC")
    Single<List<Word>> getAllWords();
}
