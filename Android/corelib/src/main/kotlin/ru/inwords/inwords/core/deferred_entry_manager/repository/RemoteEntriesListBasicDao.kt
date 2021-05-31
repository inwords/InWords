package ru.inwords.inwords.core.deferred_entry_manager.repository

import io.reactivex.Single
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

interface RemoteEntriesListBasicDao<V : CopyableWithId<V>> : RemoteEntriesListWriteDao<V> {
    fun retrieveAll(): Single<List<V>>
}