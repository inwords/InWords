package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.HasLocalAndServerId

interface RemoteEntriesListWriteDao<V : CopyableWithId<V>> {
    fun createAll(values: List<V>): Single<List<HasLocalAndServerId>>
    fun deleteAll(serverIds: List<Int>): Completable
}