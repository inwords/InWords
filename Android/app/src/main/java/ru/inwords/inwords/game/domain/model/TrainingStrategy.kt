package ru.inwords.inwords.game.domain.model

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import ru.inwords.inwords.game.domain.model.TrainingStrategy.TrainingMode
import ru.inwords.inwords.game.domain.model.TrainingStrategy.TrainingStep

@Parcelize
data class TrainingStrategy(
    val mode: TrainingMode,
    val steps: List<TrainingStep>
) : Parcelable {
    enum class TrainingStep {
        AUDITION, CLASSIC_GAME, END
    }

    enum class TrainingMode {
        WORD_SETS,
        TRAINING
    }
}

@Parcelize
data class TrainingState(
    private val strategy: TrainingStrategy,
    private val currentStep: Int = 0
) : Parcelable {
    val mode: TrainingMode get() = strategy.mode

    val currentStepOrEnd: TrainingStep get() = strategy.steps.getOrNull(currentStep) ?: TrainingStep.END

    fun movedToNextStep(): TrainingState {
        return copy(currentStep = currentStep + 1)
    }

    companion object{
        fun empty() = TrainingState(TrainingStrategy(TrainingMode.WORD_SETS, emptyList()))
    }
}

val defaultWordSetsStrategy = TrainingStrategy(TrainingMode.WORD_SETS, listOf(TrainingStep.AUDITION, TrainingStep.CLASSIC_GAME))
val defaultTrainingStrategy = TrainingStrategy(TrainingMode.TRAINING, listOf(TrainingStep.AUDITION, TrainingStep.CLASSIC_GAME))



