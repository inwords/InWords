package com.dreamproject.inwords.data.dto.game

import java.io.Serializable

data class GameLevelInfo(val levelId: Int, val title: String, val totalStars: Int,
                         val playerStars: Int, val minStarsToUnlock: Int, val available: Boolean) : Serializable