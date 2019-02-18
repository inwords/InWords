package com.dreamproject.inwords.domain

data class GameLevelInfo(val title: String, val color: String, val stars: Int,
                         val minStarsToUnlock: Int, val maxStars: Int, val available: Boolean,
                         val id: Int = 0)