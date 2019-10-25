package ru.inwords.inwords.translation.data.deferred

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import ru.inwords.inwords.core.deferred_entry_manager.model.local.DeferredEntry
import ru.inwords.inwords.core.deferred_entry_manager.model.local.Status

@Entity(tableName = "word_translation_deferred_entries", indices = [Index("id", unique = true)/*, Index("value_id", unique = true)*/])
data class WordTranslationDeferredEntry(
    override val status: Status,

    @Embedded(prefix = "value_")
    val payload: WordTranslationValue,

    @PrimaryKey(autoGenerate = true)
    val id: Long = 0
) : DeferredEntry<WordTranslationValue, WordTranslationDeferredEntry> {
    override val localId: Long get() = id
    override val remoteId: Int get() = payload.serverId
    override val value: WordTranslationValue get() = payload

    override fun copyWithLocalId(newId: Long) = copy(id = newId, payload = payload.copyWithLocalId(newId))
    override fun copyWithRemoteId(newId: Int) = copy(payload = payload.copyWithRemoteId(newId))
    override fun copyWithStatus(newStatus: Status) = copy(status = newStatus)
}