package ru.inwords.inwords.core.deferred_entry_manager.model

import ru.inwords.inwords.core.deferred_entry_manager.model.local.HasStatus
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status

interface CopyableWithIdAndStatus<out T> : HasStatus, CopyableWithId<T> where T : CopyableWithIdAndStatus<T> {
    fun copyWithStatus(newStatus: Status): T
}
