package ru.inwords.inwords.core.deferred_entry_manager

import android.os.Parcelable
import androidx.room.ColumnInfo
import androidx.room.PrimaryKey
import kotlinx.android.parcel.Parcelize

@Parcelize
data class EntityIdentificator(
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "id")
    val id: Long = 0,

    @ColumnInfo(name = "server_id")
    val serverId: Int = 0
) : Parcelable, CopyableWithId<EntityIdentificator> {
    override val localId: Long get() = id
    override val remoteId: Int get() = serverId

    override fun copyWithLocalId(newId: Long) = copy(id = newId)

    override fun copyWithRemoteId(newId: Int) = copy(serverId = newId)
}