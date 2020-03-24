package ru.inwords.inwords.core.deferred_entry_manager

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.LocalEntriesListDaoMock.UnitDeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao
import ru.inwords.inwords.translation.domain.model.EntityIdentificator

class LocalEntriesListDaoMock : LocalEntriesListDao<EntityIdentificator, UnitDeferredEntry> {
    private val internalList = mutableListOf<UnitDeferredEntry>()

    private var lastId: Long = 1

    override fun addReplaceAll(entries: List<UnitDeferredEntry>): Single<List<Long>> {
        return Single.fromCallable {
            val newEntries = entries.map {
                if (it.id == 0L) {
                    it.copyWithLocalId(lastId++)
                } else {
                    it
                }
            }.toMutableList()
            for (i in internalList.lastIndex downTo 0) {
                if (internalList[i].id in newEntries.map { entry -> entry.id }) {
                    internalList[i] = newEntries.find { it.id == internalList[i].id } ?: continue
                    newEntries.remove(internalList[i])
                }
            }
            internalList.addAll(newEntries)

            newEntries.map { it.id }
        }
    }

    override fun retrieveAll(): Single<List<UnitDeferredEntry>> {
        return Single.fromCallable { internalList.toList() }
    }

    override fun retrieveAllByLocalId(localIds: List<Long>): Single<List<UnitDeferredEntry>> {
        return Single.fromCallable { internalList.filter { it.id in localIds } }
    }

    override fun deleteAllLocalIds(localIds: List<Long>): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.id in localIds }
        }
    }

    override fun deleteAllServerIds(): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.remoteId > 0 }
        }
    }

    override fun deleteAllServerIds(serverIds: List<Int>): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.remoteId in serverIds }
        }
    }

    data class UnitDeferredEntry(
        override val status: Status,
        val id: Long,
        val payload: EntityIdentificator
    ) : DeferredEntry<EntityIdentificator, UnitDeferredEntry> {
        constructor(status: Status, payload: EntityIdentificator) : this(status, payload.id, payload)

        override val localId: Long get() = id
        override val remoteId: Int get() = payload.serverId
        override val value: EntityIdentificator get() = payload

        override fun copyWithLocalId(newId: Long) = copy(id = newId, payload = payload.copyWithLocalId(newId))
        override fun copyWithRemoteId(newId: Int) = copy(payload = payload.copyWithRemoteId(newId))
        override fun copyWithStatus(newStatus: Status) = copy(status = newStatus)
    }
}