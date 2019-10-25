package ru.inwords.inwords.game.presentation.games

import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GameInfoModel
import ru.inwords.inwords.game.domain.model.GamesInfoModel
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
