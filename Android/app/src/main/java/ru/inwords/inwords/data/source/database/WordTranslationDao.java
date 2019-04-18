package ru.inwords.inwords.data.source.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.OnConflictStrategy;
import androidx.room.Query;

import java.util.List;

import io.reactivex.Single;
import ru.inwords.inwords.data.dto.WordTranslation;

@Dao
public interface WordTranslationDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Single<Long> insert(WordTranslation wordTranslation);

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    Single<List<Long>> insertAll(List<WordTranslation> wordTranslation);

    @Delete
    Single<Integer> deleteAll(List<WordTranslation> wordTranslation);

    @Query("DELETE FROM word_translation_table")
    Single<Integer> deleteAll();

    @Query("DELETE FROM word_translation_table WHERE server_id IN (:serverIds)")
    Single<Integer> deleteAllServerIds(List<Integer> serverIds);

    @Query("SELECT * from word_translation_table ORDER BY word_native ASC")
    Single<List<WordTranslation>> getAllWords();
}
