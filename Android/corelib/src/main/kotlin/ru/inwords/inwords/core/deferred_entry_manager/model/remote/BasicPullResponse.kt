package ru.inwords.inwords.core.deferred_entry_manager.model.remote

import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

data class BasicPullResponse<T : CopyableWithId<T>>(
    override val added: List<T>? = null,
    override val removed: List<Int>? = null
) : PullResponse<T>