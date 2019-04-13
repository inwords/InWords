package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.domain.model.Resource
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _cardsDataSubject: Subject<Resource<CardsData>> = BehaviorSubject.create()
    private val _navigationSubject: Subject<FromGameEndPaths> = PublishSubject.create()

    fun onGameLevelSelected(gameLevelId: Int) {
        compositeDisposable.clear()

        gameInteractor.getLevel(gameLevelId)
                .map {
                    when (it.status) {
                        Resource.Status.SUCCESS -> Resource.success(CardsData(it.data!!.wordTranslations))
                        Resource.Status.LOADING -> Resource.loading<CardsData>(null)
                        Resource.Status.ERROR -> Resource.error<CardsData>(it.message!!, null)
                    }
                }
                .subscribe(_cardsDataSubject)
    }

    fun navigationStream(): Observable<FromGameEndPaths> = _navigationSubject

    fun onNewNavCommand(path: FromGameEndPaths) {
        _navigationSubject.onNext(path)
    }

    fun cardsStream(): Observable<Resource<CardsData>> = _cardsDataSubject

    fun onGameEnd(game: Game, levelId: Int, cardOpenClicks: Int) {
        gameInteractor.getScore(game, levelId, cardOpenClicks).subscribe()
    }
}
