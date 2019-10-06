package ru.inwords.inwords.core.deferred_entry_manager

interface DeferredEntryFactory<V, T> where V : CopyableWithId<V>, T : DeferredEntry<V> {
    fun create(status: Status, value: V): T
}
