package ru.inwords.inwords.translation.data.source

import androidx.room.*
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.translation.data.bean.WordTranslation

@Dao
interface WordTranslationDao {

    @Query("SELECT * from word_translation_table ORDER BY word_native ASC")
    fun getAllWords(): Observable<List<WordTranslation>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insert(wordTranslation: WordTranslation): Single<Long>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(wordTranslation: List<WordTranslation>): Single<List<Long>>

    @Delete
    fun deleteAll(wordTranslation: List<WordTranslation>): Single<Int>

    @Query("DELETE FROM word_translation_table")
    fun deleteAll(): Single<Int>

    @Query("DELETE FROM word_translation_table WHERE server_id IN (:serverIds)")
    fun deleteAllServerIds(serverIds: List<Int>): Single<Int>
}
