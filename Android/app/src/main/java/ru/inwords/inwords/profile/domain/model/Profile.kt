package ru.inwords.inwords.profile.domain.model

import java.time.Instant

data class Profile(
    val userId: Int,
    val nickName: String,
    val experience: Int,
    val avatarPath: String?,
    val lastLogin: Instant?,
    val role: String,
    val registrationDate: Instant?,
    val email: String
)