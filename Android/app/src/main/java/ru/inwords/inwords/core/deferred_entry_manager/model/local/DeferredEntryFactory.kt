package ru.inwords.inwords.core.deferred_entry_manager.model.local

import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

interface DeferredEntryFactory<V, T> where V : CopyableWithId<V>, T : DeferredEntry<V, T> {
    fun create(status: Status, value: V): T
}
