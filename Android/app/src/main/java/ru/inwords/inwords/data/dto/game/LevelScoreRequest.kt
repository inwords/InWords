package ru.inwords.inwords.data.dto.game

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.google.gson.annotations.SerializedName

@Entity(tableName = "level_score_request_table")
data class LevelScoreRequest(
    @SerializedName("gameLevelId") @PrimaryKey(autoGenerate = true) val levelId: Int,
    @SerializedName("wordPairIdOpenCounts") val wordTranslationIdOpenCount: Map<Int, Int>
)