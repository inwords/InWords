package ru.inwords.inwords.game.presentation.game_levels

import io.reactivex.Observable
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GameModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GameLevelsViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    fun screenInfoStream(gameId: Int): Observable<Resource<GameModel>> = gameInteractor.getGame(gameId)

    fun navigateToGameLevel(gameLevelInfo: GameLevelInfo, gameId: Int) {
        navigateTo(GameLevelsFragmentDirections.actionGameLevelsFragmentToGameLevelFragment(gameLevelInfo, gameId))
    }
}
