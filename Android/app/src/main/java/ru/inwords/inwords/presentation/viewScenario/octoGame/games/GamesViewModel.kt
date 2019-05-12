package ru.inwords.inwords.presentation.viewScenario.octoGame.games

import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.data.dto.game.GameInfo
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class GamesViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameInfo> = PublishSubject.create()

    val navigateToGame: Subject<GameInfo>
        get() = _navigateToGameLevelSubject

    fun screenInfoStream(): Observable<GamesInfoModel> = gameInteractor.getGamesInfo()

    fun onGameRemoved(gameInfo: GameInfo) {
        Log.d("onGameRemoved", gameInfo.toString()) //TODO
    }
}
