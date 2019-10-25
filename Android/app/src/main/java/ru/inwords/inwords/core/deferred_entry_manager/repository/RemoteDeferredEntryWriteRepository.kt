package ru.inwords.inwords.core.deferred_entry_manager.repository

import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

/**
 * May be useless, but is here for further scalability
 */
class RemoteDeferredEntryWriteRepository<V : CopyableWithId<V>>(
    private val remoteEntriesListWriteDao: RemoteEntriesListWriteDao<V>
) : RemoteEntriesListWriteDao<V> by remoteEntriesListWriteDao