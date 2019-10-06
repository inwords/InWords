package ru.inwords.inwords.core.deferred_entry_manager

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.DatabaseEntriesListDaoMock.UnitDeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.repository.DatabaseEntriesListDao

class DatabaseEntriesListDaoMock : DatabaseEntriesListDao<EntityIdentificator, UnitDeferredEntry> {
    private val internalList = mutableListOf<UnitDeferredEntry>()

    private var lastId: Long = 1

    private val deferredEntryFactory = object : DeferredEntryFactory<EntityIdentificator, UnitDeferredEntry> {
        override fun create(status: Status, value: EntityIdentificator): UnitDeferredEntry {
            return UnitDeferredEntry(status, value)
        }
    }

    override fun addReplaceAll(entries: List<UnitDeferredEntry>): Single<List<Long>> {
        return Single.fromCallable {
            val newEntries = entries.map {
                if (it.value.id == 0L) {
                    deferredEntryFactory.create(it.status, it.value.copyWithLocalId(lastId++))
                } else {
                    it
                }
            }.toMutableList()
            for (i in internalList.lastIndex downTo 0) {
                if (internalList[i].value.id in newEntries.map { entry -> entry.value.id }) {
                    internalList[i] = newEntries.find { it.value.id == internalList[i].value.id } ?: continue
                    newEntries.remove(internalList[i])
                }
            }
            internalList.addAll(newEntries)

            newEntries.map { it.value.id }
        }
    }

    override fun retrieveAll(): Single<List<UnitDeferredEntry>> {
        return Single.fromCallable { internalList.toList() }
    }

    override fun retrieveAllByLocalId(localIds: List<Long>): Single<List<UnitDeferredEntry>> {
        return Single.fromCallable { internalList.filter { it.value.id in localIds } }
    }

    override fun deleteAllLocalIds(localIds: List<Long>): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.value.id in localIds }
        }
    }

    override fun deleteAllServerIds(serverIds: List<Int>): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.value.serverId in serverIds }
        }
    }

    data class UnitDeferredEntry(
        override val status: Status,
        val id: Long,
        val serverId: Int,
        val payload: EntityIdentificator
    ) : DeferredEntry<EntityIdentificator> {
        constructor(status: Status, payload: EntityIdentificator) : this(status, payload.id, payload.serverId, payload)

        override val localId: Long get() = id
        override val remoteId: Int get() = serverId
        override val value: EntityIdentificator get() = payload

        override fun copyWithLocalId(newId: Long) = copy(id = newId)
        override fun copyWithRemoteId(newId: Int) = copy(serverId = newId)
        override fun copyWithStatus(newStatus: Status) = copy(status = newStatus)
    }
}