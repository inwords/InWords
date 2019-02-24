package com.dreamproject.inwords.data.dto

import com.google.gson.annotations.SerializedName

class UserCredentials(@field:SerializedName("Email") val email: String = "",
                      @field:SerializedName("Password") val password: String = "")
