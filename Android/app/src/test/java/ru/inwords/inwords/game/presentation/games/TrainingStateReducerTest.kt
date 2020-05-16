package ru.inwords.inwords.game.presentation.games

import org.junit.jupiter.api.Test

internal class TrainingStateReducerTest {

    private val trainingState = TrainingStateReducer(SimpleStateWithVisibility.Gone)

    @Test
    fun toReady() {
        trainingState.toReady()
        trainingState.state.test()
            .assertValue(SimpleStateWithVisibility.Visible(SimpleState.READY))
    }

    @Test
    fun toLoading() {
        trainingState.toLoading()
        trainingState.state.test()
            .assertValue(SimpleStateWithVisibility.Gone)

        trainingState.toReady()
        trainingState.state.test()
            .assertValue(SimpleStateWithVisibility.Visible(SimpleState.READY))
    }

    @Test
    fun toError() {
        trainingState.toError()
        trainingState.state.test()
            .assertValue(SimpleStateWithVisibility.Visible(SimpleState.ERROR))
    }

    @Test
    fun toGone() {
        trainingState.toGone()
        trainingState.state.test()
            .assertValue(SimpleStateWithVisibility.Gone)
    }
}