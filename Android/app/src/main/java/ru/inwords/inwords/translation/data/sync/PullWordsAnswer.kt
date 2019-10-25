package ru.inwords.inwords.translation.data.sync

import com.google.gson.annotations.SerializedName

import ru.inwords.inwords.translation.data.bean.WordTranslation

data class PullWordsAnswer(
        @field:SerializedName("removedServerIds")
        val removedServerIds: List<Int>,
        @field:SerializedName("addedWords")
        val addedWords: List<WordTranslation>
)
