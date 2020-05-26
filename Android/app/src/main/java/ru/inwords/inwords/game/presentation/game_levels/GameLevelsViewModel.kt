package ru.inwords.inwords.game.presentation.game_levels

import io.reactivex.Observable
import ru.inwords.inwords.R
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.Game
import ru.inwords.inwords.game.domain.model.GameLevelInfo
import ru.inwords.inwords.game.domain.model.TrainingState
import ru.inwords.inwords.game.domain.model.defaultWordSetsStrategy
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GameLevelsViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    fun screenInfoStream(gameId: Int): Observable<Resource<Game>> = gameInteractor.getGame(gameId)

    fun navigateToGameLevel(gameLevelInfo: GameLevelInfo, gameId: Int) {
        navigateTo(
            GameLevelsFragmentDirections.actionGameLevelsFragmentToGraphGameLevel(
                gameLevelInfo,
                gameId,
                TrainingState(defaultWordSetsStrategy)
            ),
            R.id.listeningFragment
        )
    }
}
