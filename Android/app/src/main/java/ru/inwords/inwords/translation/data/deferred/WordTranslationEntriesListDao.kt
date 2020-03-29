package ru.inwords.inwords.translation.data.deferred

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import io.reactivex.Completable
import io.reactivex.Single

@Dao
interface WordTranslationEntriesListDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun addReplaceAll(entries: List<WordTranslationDeferredEntry>): Single<List<Long>>

    @Query("SELECT * from word_translation_deferred_entries")
    fun retrieveAll(): Single<List<WordTranslationDeferredEntry>>

    @Query("SELECT * from word_translation_deferred_entries WHERE id IN (:localIds)")
    fun retrieveAllByLocalId(localIds: List<Long>): Single<List<WordTranslationDeferredEntry>>

    @Query("DELETE FROM word_translation_deferred_entries WHERE id IN (:localIds)")
    fun deleteAllLocalIds(localIds: List<Long>): Completable

    @Query("DELETE FROM word_translation_deferred_entries WHERE value_server_id > 0")
    fun deleteAllServerIds(): Completable

    @Query("DELETE FROM word_translation_deferred_entries WHERE value_server_id IN (:serverIds)")
    fun deleteAllServerIds(serverIds: List<Int>): Completable
}