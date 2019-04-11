package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevels

import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.domain.model.GameModel
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameLevelsViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameLevelInfo> = PublishSubject.create()

    val navigateToGameLevel: Subject<GameLevelInfo>
        get() = _navigateToGameLevelSubject

    fun screenInfoStream(gameId: Int): Observable<GameModel> = gameInteractor.getGame(gameId).toObservable()
}
