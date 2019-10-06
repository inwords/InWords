package ru.inwords.inwords.translation.data

import androidx.room.Embedded
import androidx.room.Entity
import ru.inwords.inwords.core.deferred_entry_manager.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.Status

@Entity(tableName = "word_translation_deferred_entries", primaryKeys = ["id"])
data class WordTranslationDeferredEntry(
    override val status: Status,
    @Embedded val payload: WordTranslationValue
) : DeferredEntry<WordTranslationValue> {
    override val localId: Long get() = payload.id
    override val remoteId: Int get() = payload.serverId
    override val value: WordTranslationValue get() = payload

    override fun copyWithLocalId(newId: Long) = copy(payload = payload.copyWithLocalId(newId))
    override fun copyWithRemoteId(newId: Int) = copy(payload = payload.copyWithRemoteId(newId))
    override fun copyWithStatus(newStatus: Status) = copy(status = newStatus)
}