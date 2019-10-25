package ru.inwords.inwords.core.deferred_entry_manager.model.local

import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithIdAndStatus

interface DeferredEntry<V, T> : CopyableWithIdAndStatus<T>, CopyableWithId<T>
    where V : CopyableWithId<V>, T : CopyableWithIdAndStatus<T> {
    override val status: Status
    override val localId: Long
    override val remoteId: Int
    val value: V
}

enum class Status {
    /**
     * Exists both locally and remotely
     */
    SYNCED,
    /**
     * Removed locally, but exists remote
     */
    LOCALLY_DELETED,
    /**
     * Created locally, but not uploaded to the remote
     */
    LOCALLY_CREATED,
}