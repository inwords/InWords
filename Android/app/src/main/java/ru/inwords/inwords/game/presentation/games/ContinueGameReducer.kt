package ru.inwords.inwords.game.presentation.games

import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.game.domain.model.GamePathToLevel
import java.util.concurrent.TimeUnit

class ContinueGameReducer(defaultState: GamePathToLevelState) {
    private val continueGameState: Subject<GamePathToLevelState> = BehaviorSubject.create<GamePathToLevelState>().toSerialized()

    val state: Observable<GamePathToLevelState> = continueGameState
        .throttleLast(100, TimeUnit.MILLISECONDS)
        .distinctUntilChanged()
        .startWith(defaultState)

    fun toReady(path: GamePathToLevel) {
        continueGameState.onNext(GamePathToLevelState.Ready(path))
    }

    fun toGameEnd() {
        continueGameState.onNext(GamePathToLevelState.GameEnd)
    }

    fun toLoading() {
        continueGameState.onNext(GamePathToLevelState.Loading)
    }

    fun toError() {
        continueGameState.onNext(GamePathToLevelState.Error)
    }
}