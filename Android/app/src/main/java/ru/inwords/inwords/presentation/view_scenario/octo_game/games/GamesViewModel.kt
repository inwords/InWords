package ru.inwords.inwords.presentation.view_scenario.octo_game.games

import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.GameInfoModel
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GamesViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameInfoModel> = PublishSubject.create()

    val navigateToGame: Subject<GameInfoModel>
        get() = _navigateToGameLevelSubject

    fun screenInfoStream(): Observable<Resource<GamesInfoModel>> = gameInteractor.getGamesInfo()

    fun onGameRemoved(gameInfo: GameInfoModel) {
        Log.d("onGameRemoved", gameInfo.toString()) //TODO
    }
}
