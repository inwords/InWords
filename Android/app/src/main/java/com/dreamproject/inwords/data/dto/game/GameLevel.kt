package com.dreamproject.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import com.dreamproject.inwords.data.dto.WordTranslation
import com.google.gson.annotations.SerializedName

@Entity(tableName = "game_level_table", indices = [Index("levelId", unique = true)])
data class GameLevel(
        @PrimaryKey
        @SerializedName("levelID") val levelId: Int,
        @SerializedName("wordTranslations") val wordTranslations: List<WordTranslation>)