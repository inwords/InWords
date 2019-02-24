package com.dreamproject.inwords.data.dto.game

import com.dreamproject.inwords.data.dto.WordTranslation
import com.google.gson.annotations.SerializedName

data class GameLevel(
        @SerializedName("levelID") val levelId: Int,
        @SerializedName("wordTranslations") val wordTranslations: List<WordTranslation>)