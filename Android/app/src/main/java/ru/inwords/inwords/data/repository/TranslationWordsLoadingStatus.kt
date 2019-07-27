package ru.inwords.inwords.data.repository

enum class TranslationWordsLoadingStatus {
    NO_REQUESTS,
    LOADING,
    LOADED_LOCAL,
    LOADED_REMOTE,
    ERROR
}
