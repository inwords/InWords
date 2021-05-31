package ru.inwords.inwords.core.deferred_entry_manager

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.HasLocalAndServerId
import ru.inwords.inwords.core.deferred_entry_manager.repository.RemoteEntriesListBasicDao

class RemoteEntriesListDaoMock : RemoteEntriesListBasicDao<EntityIdentificator> {
    private val internalList = mutableListOf<EntityIdentificator>()

    private var lastId: Int = 1

    override fun createAll(values: List<EntityIdentificator>): Single<List<HasLocalAndServerId>> {
        return Single.fromCallable {
            val newValues = values.map { it.copyWithRemoteId(lastId++) }
            internalList.addAll(newValues)
            newValues
        }
    }

    override fun retrieveAll(): Single<List<EntityIdentificator>> {
        return Single.fromCallable { internalList }
    }

    override fun deleteAll(serverIds: List<Int>): Completable {
        return Completable.fromAction {
            internalList.removeIf { it.remoteId in serverIds }
        }
    }

}