package ru.inwords.inwords.home.recycler

import ru.inwords.inwords.profile.domain.model.Profile

sealed class CardWrapper {
    object CreateAccountMarker : CardWrapper()
    object ProfileLoadingMarker : CardWrapper()
    data class ProfileModel(val profile: Profile) : CardWrapper()
    data class DictionaryModel(val success: Boolean, val count: Int = 0) : CardWrapper()
}

enum class SimpleState {
    READY, LOADING, ERROR
}

sealed class SimpleStateWithVisibility {
    data class Visible(val state: SimpleState) : SimpleStateWithVisibility()
    object Gone : SimpleStateWithVisibility()
}
