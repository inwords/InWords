package ru.inwords.inwords.data.dto

import android.os.Parcelable
import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import kotlinx.android.parcel.Parcelize

@Parcelize
@Entity(tableName = "word_translation_table", indices = [Index(value = ["word_foreign", "word_native"], unique = true)])
data class WordTranslation(
        @ColumnInfo(name = "word_foreign")
        val wordForeign: String,

        @ColumnInfo(name = "word_native")
        val wordNative: String,

        @PrimaryKey(autoGenerate = true)
        @ColumnInfo(name = "id")
        val id: Long = 0,

        @ColumnInfo(name = "server_id")
        val serverId: Int = 0
) : Parcelable {
    companion object {
        const val LOCAL_REMOVE_FLAG = Integer.MIN_VALUE
    }
}

val WordTranslation.isLocallyDeleted get() = serverId == WordTranslation.LOCAL_REMOVE_FLAG
val WordTranslation.isRemoteDeleted get() = serverId < 0 && !isLocallyDeleted

fun WordTranslation.withServerId(serverId: Int) = copy(serverId = serverId)

fun WordTranslation.markRemoteDeleted() = copy(serverId = -serverId) //minus
fun WordTranslation.markLocallyDeleted() = copy(serverId = WordTranslation.LOCAL_REMOVE_FLAG)
fun WordTranslation.markRemoved() =
        if (serverId == 0) {
            markLocallyDeleted()
        } else {
            markRemoteDeleted()
        }

fun List<WordTranslation>.markRemoved() = map { it.markRemoved() }