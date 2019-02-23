package com.dreamproject.inwords.data.dto.game

data class GameLevelInfo(val levelId: Int, val totalStars: Int, val playerStars: Int,
                         val successStars: Int, val isAvailable: Boolean)