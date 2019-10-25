package ru.inwords.inwords.core.deferred_entry_manager.model

interface HasLocalAndServerId {
    val localId: Long
    val remoteId: Int
}