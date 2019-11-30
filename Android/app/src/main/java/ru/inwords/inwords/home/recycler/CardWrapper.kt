package ru.inwords.inwords.home.recycler

import ru.inwords.inwords.profile.data.bean.User

sealed class CardWrapper {
    object CreateAccountMarker : CardWrapper()
    object ProfileLoadingMarker : CardWrapper()
    data class ProfileModel(val user: User) : CardWrapper()
    data class DictionaryModel(val success: Boolean, val count: Int = 0) : CardWrapper()
    object WordsTrainingMarker : CardWrapper()
}