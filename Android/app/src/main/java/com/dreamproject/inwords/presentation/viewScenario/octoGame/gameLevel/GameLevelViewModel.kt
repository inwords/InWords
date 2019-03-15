package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _cardsDataSubject: Subject<CardsData> = BehaviorSubject.create()

    val navigateToGameLevel: Observable<CardsData>
        get() = _cardsDataSubject

    fun onGameLevelSelected(gameLevelId: Int) {
        compositeDisposable.clear()

        compositeDisposable.add(gameInteractor.getLevel(gameLevelId)
                .map { CardsData(it.wordTranslations) }
                .subscribe(_cardsDataSubject::onNext, Throwable::printStackTrace)) //TODO care
    }

    fun cardsStream(): Single<CardsData> = _cardsDataSubject.firstOrError()
}
