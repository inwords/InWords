package ru.inwords.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName
import ru.inwords.inwords.data.dto.WordTranslation

@Entity(tableName = "game_level_table")
data class GameLevel(
        @PrimaryKey
        @SerializedName("levelId") val levelId: Int,
        @SerializedName("wordTranslations") val wordTranslations: List<WordTranslation>)