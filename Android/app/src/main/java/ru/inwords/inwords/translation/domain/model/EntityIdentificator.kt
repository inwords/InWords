package ru.inwords.inwords.translation.domain.model

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import ru.inwords.inwords.core.deferred_entry_manager.model.CopyableWithId

@Parcelize
data class EntityIdentificator(
    val id: Long = 0,
    val serverId: Int = 0
) : Parcelable, CopyableWithId<EntityIdentificator> {
    override val localId: Long get() = id
    override val remoteId: Int get() = serverId

    override fun copyWithLocalId(newId: Long) = copy(id = newId)
    override fun copyWithRemoteId(newId: Int) = copy(serverId = newId)
}