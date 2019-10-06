package ru.inwords.inwords.core.deferred_entry_manager

interface CopyableWithStatus<out T> : HasStatus where T : CopyableWithStatus<T> {
    fun copyWithStatus(newStatus: Status): T
}
