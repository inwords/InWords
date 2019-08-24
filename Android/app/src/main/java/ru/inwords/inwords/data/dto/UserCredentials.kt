package ru.inwords.inwords.data.dto

import com.google.gson.annotations.SerializedName

data class UserCredentials(@SerializedName("Email") val email: String = "",
                           @SerializedName("Password") val password: String = "")
