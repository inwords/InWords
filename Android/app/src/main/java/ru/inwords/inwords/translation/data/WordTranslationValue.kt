package ru.inwords.inwords.translation.data

import androidx.room.ColumnInfo
import androidx.room.PrimaryKey
import ru.inwords.inwords.core.deferred_entry_manager.CopyableWithId

data class WordTranslationValue(
    @ColumnInfo(name = "word_foreign")
    val wordForeign: String,

    @ColumnInfo(name = "word_native")
    val wordNative: String,

    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    val id: Long = 0,

    @ColumnInfo(name = "server_id")
    val serverId: Int = 0
) : CopyableWithId<WordTranslationValue> {
    override val localId: Long get() = id
    override val remoteId: Int get() = serverId

    override fun copyWithLocalId(newId: Long) = copy(id = newId)

    override fun copyWithRemoteId(newId: Int) = copy(serverId = newId)
}