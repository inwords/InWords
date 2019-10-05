package ru.inwords.inwords.game.presentation.custom_game

import android.util.Log
import io.reactivex.Observable
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.data.bean.GameLevelInfo
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GamesInfoModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.data.bean.WordTranslation

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
