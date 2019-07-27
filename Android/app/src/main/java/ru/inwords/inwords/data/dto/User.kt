package ru.inwords.inwords.data.dto

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "user_table")
data class User(
        @PrimaryKey
        @SerializedName("UserId") val userId: Int,
        @SerializedName("nickName") val userName: String,
        @SerializedName("avatarPath") val avatar: String?,
        @SerializedName("experience") val experience: Int,
        @SerializedName("account") val account: String?
)