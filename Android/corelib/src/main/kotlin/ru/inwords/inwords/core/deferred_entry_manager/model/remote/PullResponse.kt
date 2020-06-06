package ru.inwords.inwords.core.deferred_entry_manager.model.remote

import ru.inwords.inwords.core.deferred_entry_manager.model.HasLocalAndServerId

interface PullResponse<T : HasLocalAndServerId> {
    val added: List<T>?
    val removed: List<Int>?
}