package com.dreamproject.inwords.presentation.viewScenario.octoGame

import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.data.repository.GameRemoteRepository
import com.dreamproject.inwords.domain.GameLevelsScreenInfo
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameLevelsViewModel(private val gameRepository: GameRemoteRepository) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameLevelInfo> = PublishSubject.create()

    val navigateToGameLevel: Observable<GameLevelInfo>
        get() = _navigateToGameLevelSubject

    fun onGameLevelSelected(gameLevelInfo: GameLevelInfo) {
        _navigateToGameLevelSubject.onNext(gameLevelInfo)
    }

    fun screenInfoStream(gameId: Int) = gameRepository.getGame(gameId)
            .map { GameLevelsScreenInfo(true, it) }
}
