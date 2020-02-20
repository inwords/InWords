package ru.inwords.inwords.game.presentation.games

import android.util.Log
import io.reactivex.Observable
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GamesViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    fun screenInfoStream(): Observable<Resource<GamesInfoModel>> = gameInteractor.getGamesInfo()

    fun onGameRemoved(gameInfo: GameInfoModel) {
        Log.d("onGameRemoved", gameInfo.toString()) //TODO
    }

    fun navigateToGame(gameInfo: GameInfoModel) {
        navigateTo(GamesFragmentDirections.actionGamesFragmentToGameLevelsFragment(gameInfo))
    }
}
