package com.dreamproject.inwords.data.source.database;

import com.dreamproject.inwords.data.dto.WordTranslation;

import java.util.List;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;
import io.reactivex.Single;

@Dao
public interface WordTranslationDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    long insert(WordTranslation wordTranslation);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    List<Long> insertAll(List<WordTranslation> wordTranslation);

    @Delete
    int deleteAll(List<WordTranslation> wordTranslation);

    @Query("DELETE FROM word_translation_table")
    int deleteAll();

    @Query("DELETE FROM word_translation_table WHERE server_id IN (:serverIds)")
    int deleteAllServerIds(List<Integer> serverIds);

    @Query("SELECT * from word_translation_table ORDER BY word_native ASC")
    Single<List<WordTranslation>> getAllWords();
}
