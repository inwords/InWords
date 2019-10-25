package ru.inwords.inwords.profile.data.bean

import com.google.gson.annotations.SerializedName

data class UserCredentials(@SerializedName("Email") val email: String = "",
                           @SerializedName("Password") val password: String = "")
