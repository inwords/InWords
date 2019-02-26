package com.dreamproject.inwords.data.dto

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "user_table")
data class User(
        @PrimaryKey
        val userId: Int,
        val userName: String,
        val firstName: String,
        val middleName: String,
        val lastName: String,
        val password: String)