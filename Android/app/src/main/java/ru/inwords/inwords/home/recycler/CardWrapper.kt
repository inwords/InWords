package ru.inwords.inwords.home.recycler

import ru.inwords.inwords.profile.data.bean.User

sealed class CardWrapper {
    object CreateAccountMarker : CardWrapper()
    object ProfileLoadingMarker : CardWrapper()
    data class ProfileModel(val user: User) : CardWrapper()
    data class DictionaryModel(val success: Boolean, val count: Int = 0) : CardWrapper()
}

enum class SimpleState {
    READY, LOADING, ERROR
}

sealed class SimpleStateWithVisibility {
    data class Visible(val state: SimpleState) : SimpleStateWithVisibility()
    object Gone : SimpleStateWithVisibility()
}
