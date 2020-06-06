package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.remote.PullResponse

interface RemoteEntriesListPullDao<V : CopyableWithId<V>> : RemoteEntriesListWriteDao<V> {
    fun retrieveAll(existingServedIdsProvider: List<Int>): Single<PullResponse<V>>
}