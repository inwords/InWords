package ru.inwords.inwords.translation.data.deferred

import androidx.room.ColumnInfo
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

data class WordTranslationValue(
    @ColumnInfo(name = "word_foreign")
    val wordForeign: String,

    @ColumnInfo(name = "word_native")
    val wordNative: String,

    @ColumnInfo(name = "id")
    val id: Long,

    @ColumnInfo(name = "server_id")
    val serverId: Int
) : CopyableWithId<WordTranslationValue> {
    override val localId: Long get() = id
    override val remoteId: Int get() = serverId

    override fun copyWithLocalId(newId: Long) = copy(id = newId)

    override fun copyWithRemoteId(newId: Int) = copy(serverId = newId)
}