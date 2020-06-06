package ru.inwords.inwords.core.deferred_entry_manager

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status
import ru.inwords.inwords.core.deferred_entry_manager.repository.LocalEntriesListDao

class LocalEntriesListDaoMock<V, T>: LocalEntriesListDao<V, T>  where V : CopyableWithId<V>, T : DeferredEntry<V, T>{
    private val internalList = mutableListOf<T>()

    private var lastId: Long = 1

    override fun addReplaceAll(entries: List<T>): Single<List<Long>> {
        return Single.fromCallable {
            val newEntries = entries.map {
                if (it.localId == 0L) {
                    it.copyWithLocalId(lastId++)
                } else {
                    it
                }
            }.toMutableList()
            for (i in internalList.lastIndex downTo 0) {
                if (internalList[i].localId in newEntries.map { entry -> entry.localId }) {
                    internalList[i] = newEntries.find { it.localId == internalList[i].localId } ?: continue
                    newEntries.remove(internalList[i])
                }
            }
            internalList.addAll(newEntries)

            newEntries.map { it.localId }
        }
    }

    override fun retrieveAll(): Single<List<T>> {
        return Single.fromCallable { internalList.toList() }
    }

    override fun retrieveAllByLocalId(localIds: List<Long>): Single<List<T>> {
        return Single.fromCallable { internalList.filter { it.localId in localIds } }
    }

    override fun deleteAllLocalIds(localIds: List<Long>): Completable {
        return Completable.fromAction {
            internalList.removeAll { it.localId in localIds }
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