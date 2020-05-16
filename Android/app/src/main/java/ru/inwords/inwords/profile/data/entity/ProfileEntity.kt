package ru.inwords.inwords.profile.data.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_table")
data class ProfileEntity(
    @PrimaryKey
    val userId: Int,
    val nickName: String,
    val experience: Int,
    val avatarPath: String?,
    val lastLogin: String,
    val role: String,
    val registrationDate: String,
    val email: String
)