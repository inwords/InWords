package ru.inwords.inwords.core.deferred_entry_manager

interface CopyableWithId<out T> : HasLocalAndServerId where T : CopyableWithId<T> {
    fun copyWithLocalId(newId: Long): T
    fun copyWithRemoteId(newId: Int): T
}
