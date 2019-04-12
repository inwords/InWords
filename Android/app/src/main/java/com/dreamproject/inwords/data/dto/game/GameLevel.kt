package com.dreamproject.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.dreamproject.inwords.data.dto.WordTranslation
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_level_table")
data class GameLevel(
        @PrimaryKey
        @SerializedName("levelId") val levelId: Int,
        @SerializedName("wordTranslations") val wordTranslations: List<WordTranslation>)

val emptyGameLevel get() = GameLevel(0, emptyList())