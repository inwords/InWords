package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Completable
import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.HasLocalAndServerId

interface RemoteEntriesListDao<T : CopyableWithId<T>> {
    fun createAll(values: List<T>): Single<List<HasLocalAndServerId>>
    fun retrieveAll(): Single<List<T>>
    fun deleteAll(serverIds: List<Int>): Completable
}