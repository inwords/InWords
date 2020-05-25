package ru.inwords.inwords.game.presentation.custom_game

import android.util.Log
import io.reactivex.Single
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.data.repository.custom_game.GameCreator
import ru.inwords.inwords.game.domain.model.TrainingState
import ru.inwords.inwords.game.domain.model.defaultTrainingStrategy
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.domain.model.WordTranslation

class CustomGameCreatorViewModel(private val gameCreator: GameCreator) : BasicViewModel() {
    fun onStartClicked(wordTranslations: List<WordTranslation>) {
        createCustomLevel(wordTranslations)
    }

    private fun createCustomLevel(wordTranslations: List<WordTranslation>) {
        Single.fromCallable { gameCreator.createLevel(wordTranslations) }
            .subscribeOn(SchedulersFacade.io())
            .subscribe({
                navigateTo(
                    CustomGameCreatorFragmentDirections.actionCustomGameCreatorFragmentToGraphGameLevel(
                        it, CUSTOM_GAME_ID,
                        TrainingState(defaultTrainingStrategy)
                    )
                )
            }, { Log.d("CustomGameCreatorViewMo", it.message.orEmpty()) })
            .autoDispose()
    }
}
