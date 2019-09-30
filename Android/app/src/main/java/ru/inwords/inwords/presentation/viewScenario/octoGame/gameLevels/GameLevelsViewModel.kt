package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevels

import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class GameLevelsViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameLevelInfo> = PublishSubject.create()

    val navigateToGameLevel: Subject<GameLevelInfo>
        get() = _navigateToGameLevelSubject

    fun screenInfoStream(gameId: Int): Observable<Resource<GameModel>> = gameInteractor.getGame(gameId)
}
