package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntryFactory
import ru.inwords.inwords.core.deferred_entry_manager.Status

class LocalDeferredEntryRepository<V, T>(
    private val databaseDao: DatabaseEntriesListDao<V, T>,
    private val deferredEntryFactory: DeferredEntryFactory<V, T>
) where V : CopyableWithId<V>, T : DeferredEntry<V> {

    /**
     * To add completely new value (with localId = 0) use [alreadySynced] = false (default)
     * To force adding already synced values use [alreadySynced] = true
     *
     * @return list of [DeferredEntry] marked as [Status.LOCALLY_CREATED] or [Status.SYNCED]
     */
    fun addReplaceAll(values: List<V>, alreadySynced: Boolean = false): Single<List<T>> {
        return Single.fromCallable {
            if (alreadySynced) {
                asSynced(values)
            } else {
                asLocallyCreated(values)
            }
        }
            .flatMap { entries ->
                databaseDao.addReplaceAll(entries)
                    .map { newIds ->
                        entries.zip(newIds).map { (entry, newId) ->
                            deferredEntryFactory.create(entry.status, entry.value.copyWithLocalId(newId))
                        }
                    }
            }
    }

    /**
     * Retrieve all stored [DeferredEntry]
     */
    fun retrieveAll() = databaseDao.retrieveAll()

    /**
     * Retrieve all entries with [localIds]
     */
    fun retrieveAllByLocalId(localIds: List<Long>) = databaseDao.retrieveAllByLocalId(localIds)

    /**
     * To defer value deletion (with status [Status.LOCALLY_DELETED]) use [deferred] = true (default)
     * To force value deletion use [deferred] = false
     */
    fun deleteAllLocalIds(localIds: List<Long>, deferred: Boolean = true): Completable {
        return if (deferred) {
            databaseDao.retrieveAllByLocalId(localIds)
                .map { asLocallyDeleted(it) }
                .flatMap { databaseDao.addReplaceAll(it) }
                .ignoreElement()
        } else {
            databaseDao.deleteAllLocalIds(localIds)
        }
    }

    /**
     * Deletes all matching entries
     */
    fun deleteAllServerIds(serverIds: List<Int>) = databaseDao.deleteAllServerIds(serverIds)

    private fun asLocallyCreated(values: List<V>) = asDeferredEntries(Status.LOCALLY_CREATED, values)
    private fun asSynced(values: List<V>) = asDeferredEntries(Status.SYNCED, values)
    private fun asDeferredEntries(status: Status, values: List<V>) = values.map { deferredEntryFactory.create(status, it) }
    private fun asLocallyDeleted(values: List<T>) = values.map { deferredEntryFactory.create(Status.LOCALLY_DELETED, it.value) }
}