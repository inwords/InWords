package ru.inwords.inwords.game.presentation.custom_game

import android.util.Log
import io.reactivex.Observable
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.repository.custom_game.CUSTOM_GAME_ID
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.data.bean.WordTranslation

class CustomGameCreatorViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    fun screenInfoStream(): Observable<Resource<GamesInfoModel>> = gameInteractor.getGamesInfo()

    fun onStartClicked(wordTranslations: List<WordTranslation>) {
        createCustomLevel(wordTranslations)
    }

    private fun createCustomLevel(wordTranslations: List<WordTranslation>) {
        gameInteractor.createCustomLevel(wordTranslations)
            .subscribeOn(SchedulersFacade.io())
            .subscribe({
                navigateTo(
                    CustomGameCreatorFragmentDirections.actionCustomGameCreatorFragmentToGameLevelFragment(it, CUSTOM_GAME_ID)
                )
            }, { Log.d("CustomGameCreatorViewMo", it.message.orEmpty()) })
            .autoDispose()
    }
}
