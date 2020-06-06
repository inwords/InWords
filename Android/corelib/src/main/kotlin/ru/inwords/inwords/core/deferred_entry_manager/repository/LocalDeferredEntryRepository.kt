package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntryFactory
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status

class LocalDeferredEntryRepository<V, T>(
    private val localDao: LocalEntriesListDao<V, T>,
    private val deferredEntryFactory: DeferredEntryFactory<V, T>
) where V : CopyableWithId<V>, T : DeferredEntry<V, T> {

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
                localDao.addReplaceAll(entries)
                    .flatMap { newIds ->
                        val newEntries = entries.zip(newIds).map { (entry, newId) -> entry.copyWithLocalId(newId) }

                        localDao.addReplaceAll(newEntries).map { newEntries } //TODO shit
                    }
            }
    }

    /**
     * Retrieve all stored [DeferredEntry]
     */
    fun retrieveAll() = localDao.retrieveAll()

    /**
     * Retrieve all entries with [localIds]
     */
    fun retrieveAllByLocalId(localIds: List<Long>) = localDao.retrieveAllByLocalId(localIds)

    /**
     * To defer value deletion (with status [Status.LOCALLY_DELETED]) use [deferred] = true (default)
     * To force value deletion use [deferred] = false
     */
    fun deleteAllLocalIds(localIds: List<Long>, deferred: Boolean = true): Completable {
        return if (deferred) {
            localDao.retrieveAllByLocalId(localIds)
                .map { asLocallyDeleted(it) }
                .flatMap { localDao.addReplaceAll(it) }
                .ignoreElement()
        } else {
            localDao.deleteAllLocalIds(localIds)
        }
    }

    /**
     * Deletes all entries with remoteId > 0
     */
    fun deleteAllRemoteIds() = localDao.deleteAllServerIds()

    /**
     * Deletes all matching entries
     */
    fun deleteAllRemoteIds(serverIds: List<Int>) = localDao.deleteAllServerIds(serverIds)

    private fun asLocallyCreated(values: List<V>) = asDeferredEntries(Status.LOCALLY_CREATED, values)
    private fun asSynced(values: List<V>) = asDeferredEntries(Status.SYNCED, values)
    private fun asDeferredEntries(status: Status, values: List<V>) = values.map { deferredEntryFactory.create(status, it) }
    private fun asLocallyDeleted(entries: List<T>): List<T> = entries.map { it.copyWithStatus(Status.LOCALLY_DELETED) }
}