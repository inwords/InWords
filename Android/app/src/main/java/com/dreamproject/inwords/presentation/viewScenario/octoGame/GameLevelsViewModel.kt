package com.dreamproject.inwords.presentation.viewScenario.octoGame

import com.dreamproject.inwords.domain.GameLevelInfo
import com.dreamproject.inwords.domain.GameLevelsScreenInfo
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameLevelsViewModel : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameLevelInfo> = PublishSubject.create()

    val navigateToGameLevel: Observable<GameLevelInfo>
        get() = _navigateToGameLevelSubject

    fun onGameLevelSelected(gameLevelInfo: GameLevelInfo) {
        _navigateToGameLevelSubject.onNext(gameLevelInfo)
    }

    fun screenInfoStream() = Observable.just(GameLevelsScreenInfo(false, arrayListOf(
            GameLevelInfo("Introduction", "0x225465", 2, 3, 3, true, 0),
            GameLevelInfo("Beginning", "0x225465", 0, 3, 3, false, 0),
            GameLevelInfo("Super level", "0x225465", 5, 3, 5, true, 0),
            GameLevelInfo("Extra notes", "0x225465", 2, 3, 5, false, 0))))
}
