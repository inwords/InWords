package com.dreamproject.inwords.data.source.database;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Maybe;

@Dao
public interface WordTranslationDao {

    @Insert
    long insert(WordTranslation wordTranslation);

    @Insert
    long[] insertAll(List<WordTranslation> wordTranslation);

    @Query("DELETE FROM word_translation_table")
    int deleteAll();

    @Query("SELECT * from word_translation_table ORDER BY wordForeign ASC")
    Maybe<List<WordTranslation>> getAllWords();
}
