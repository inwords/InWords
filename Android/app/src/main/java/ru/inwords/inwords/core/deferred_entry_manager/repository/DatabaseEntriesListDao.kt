package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntry

interface DatabaseEntriesListDao<V, T> where V : CopyableWithId<V>, T : DeferredEntry<V> {
    fun addReplaceAll(entries: List<T>): Single<List<Long>>
    fun retrieveAll(): Single<List<T>>
    fun retrieveAllByLocalId(localIds: List<Long>): Single<List<T>>
    fun deleteAllLocalIds(localIds: List<Long>): Completable
    fun deleteAllServerIds(serverIds: List<Int>): Completable
}