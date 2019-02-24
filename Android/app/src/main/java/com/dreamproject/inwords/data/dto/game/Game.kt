package com.dreamproject.inwords.data.dto.game

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Game(
        @SerializedName("gameID") val gameId: Int,
        @SerializedName("creator") val creator: String,
        @SerializedName("levelInfos") val gameLevelInfos: List<GameLevelInfo>) : Serializable