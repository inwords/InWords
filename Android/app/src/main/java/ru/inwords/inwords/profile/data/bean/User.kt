package ru.inwords.inwords.profile.data.bean

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "user_table")
data class User(
        @PrimaryKey
        @SerializedName("userId") val userId: Int,
        @SerializedName("nickName") val userName: String,
        @SerializedName("avatarPath") val avatar: String?,
        @SerializedName("experience") val experience: Int,
        @Embedded
        @SerializedName("account") val account: Account?
)

data class Account(
        val accountId: Int,
        val email: String,
        val role: Int,
        val registrationDate: String?, /*Date*/
        val hash: String? = null,
        val user: Int? = null
)