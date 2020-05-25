package ru.inwords.inwords.game.presentation.listening

import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class ListeningLevelViewModel(
    private val settingsRepository: SettingsRepository
) : BasicViewModel() {

    val scaleText get() = settingsRepository.scaleGame
}
