package ru.inwords.inwords.game.presentation.games

import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject

class TrainingStateReducer(defaultState: SimpleStateWithVisibility) {
    private val trainingState: BehaviorSubject<SimpleStateWithVisibility> = BehaviorSubject.createDefault(defaultState)

    val state: Observable<SimpleStateWithVisibility> = trainingState.distinctUntilChanged()

    fun toReady() {
        trainingState.onNext(SimpleStateWithVisibility.Visible(SimpleState.READY))
    }

    fun toLoading() {
        if (trainingState.value !is SimpleStateWithVisibility.Gone) {
            trainingState.onNext(SimpleStateWithVisibility.Visible(SimpleState.LOADING))
        }
    }

    fun toError() {
        trainingState.onNext(SimpleStateWithVisibility.Visible(SimpleState.ERROR))
    }

    fun toGone() {
        trainingState.onNext(SimpleStateWithVisibility.Gone)
    }
}