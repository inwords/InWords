package com.dreamproject.inwords.data.dto.game

import com.dreamproject.inwords.data.dto.WordTranslation

data class GameLevel(val levelId: Int, val wordTranslations: List<WordTranslation>)