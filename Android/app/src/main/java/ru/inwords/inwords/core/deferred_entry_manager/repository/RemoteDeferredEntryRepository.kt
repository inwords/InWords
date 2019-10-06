package ru.inwords.inwords.core.deferred_entry_manager.repository

import ru.inwords.inwords.core.deferred_entry_manager.CopyableWithId

/**
 * May be useless, but is here for further scalability
 */
class RemoteDeferredEntryRepository<T : CopyableWithId<T>>(
    private val remoteEntriesListDao: RemoteEntriesListDao<T>
) : RemoteEntriesListDao<T> by remoteEntriesListDao