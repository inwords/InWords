package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.OnConflictStrategy;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Single;

@Dao
public interface WordTranslationDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insert(WordTranslation wordTranslation);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    List<Long> insertAll(List<WordTranslation> wordTranslation);

    @Delete
    int delete(WordTranslation wordTranslation);

    @Delete
    int deleteAll(List<WordTranslation> wordTranslation);

    @Query("DELETE FROM word_translation_table")
    int deleteAll();

    @Update
    int update(WordTranslation word);

    @Update
    int updateAll(List<WordTranslation> wordTranslation);

    @Query("DELETE FROM word_translation_table WHERE server_id IN (:serverIds)")
    int deleteAllServerIds(List<Integer> serverIds);

    @Query("SELECT * from word_translation_table ORDER BY word_native ASC")
    Single<List<WordTranslation>> getAllWords();
}
