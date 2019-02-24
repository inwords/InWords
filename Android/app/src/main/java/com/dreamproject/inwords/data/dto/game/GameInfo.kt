package com.dreamproject.inwords.data.dto.game

import com.google.gson.annotations.SerializedName

data class GameInfo(
        @SerializedName("gameID") val gameId: Int,
        @SerializedName("title")  val title: String,
        @SerializedName("isAvaliable") val available: Boolean)