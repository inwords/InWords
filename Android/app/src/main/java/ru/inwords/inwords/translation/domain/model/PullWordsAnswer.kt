package ru.inwords.inwords.translation.domain.model

data class PullWordsAnswer(
    val removedServerIds: List<Int>,
    val addedWords: List<WordTranslation>
)
