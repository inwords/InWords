package ru.inwords.inwords.data.dto.game

import android.os.Parcelable
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import kotlinx.android.parcel.Parcelize

@Parcelize
@Entity(tableName = "game_info_table")
data class GameInfo(
        @PrimaryKey
        @SerializedName("gameId") val gameId: Int,
        @SerializedName("creatorId") val creatorId: Int,
        @SerializedName("description") val description: String,
        @SerializedName("title") val title: String,
        @SerializedName("isAvaliable") val available: Boolean) : Parcelable