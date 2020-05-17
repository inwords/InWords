package ru.inwords.inwords.game.presentation.games

import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.game.domain.model.GamePathToLevel
import java.util.concurrent.TimeUnit

class ContinueGameReducer(defaultState: GamePathToLevelState) {
    private val trainingState: BehaviorSubject<GamePathToLevelState> = BehaviorSubject.create()

    val state: Observable<GamePathToLevelState> = trainingState
        .throttleLast(100, TimeUnit.MILLISECONDS)
        .distinctUntilChanged()
        .startWith(defaultState)

    fun toReady(path: GamePathToLevel) {
        trainingState.onNext(GamePathToLevelState.Ready(path))
    }

    fun toGameEnd() {
        trainingState.onNext(GamePathToLevelState.GameEnd)
    }

    fun toLoading() {
        trainingState.onNext(GamePathToLevelState.Loading)
    }

    fun toError() {
        trainingState.onNext(GamePathToLevelState.Error)
    }
}