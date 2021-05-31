package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class GamePathToLevel(val gameInfo: GameInfo, val game: Game, val gameLevelInfo: GameLevelInfo) : Parcelable
object FirstZeroStarsLevelNotFoundException : Exception("First zero stars level not found")