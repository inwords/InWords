package ru.inwords.inwords.core.deferred_entry_manager

interface DeferredEntry<T> : CopyableWithStatus<DeferredEntry<T>>, CopyableWithId<DeferredEntry<T>> where T : CopyableWithId<T> {
    override val status: Status
    override val localId: Long
    override val remoteId: Int
    val value: T
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