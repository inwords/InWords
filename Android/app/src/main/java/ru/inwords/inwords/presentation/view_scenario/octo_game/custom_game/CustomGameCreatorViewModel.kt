package ru.inwords.inwords.presentation.view_scenario.octo_game.custom_game

import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class CustomGameCreatorViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<GameLevelInfo> = PublishSubject.create()

    val navigateToGameLevel: Subject<GameLevelInfo>
        get() = _navigateToGameLevelSubject

    fun screenInfoStream(): Observable<Resource<GamesInfoModel>> = gameInteractor.getGamesInfo()

    fun onStartClicked(wordTranslations: List<WordTranslation>) {
        createCustomLevel(wordTranslations)
    }

    private fun createCustomLevel(wordTranslations: List<WordTranslation>) {
        gameInteractor.createCustomLevel(wordTranslations)
                .subscribeOn(SchedulersFacade.io())
                .subscribe({
                    _navigateToGameLevelSubject.onNext(it)
                }, { Log.d("CustomGameCreatorViewMo", it.message.orEmpty()) })
                .autoDispose()
    }
}
