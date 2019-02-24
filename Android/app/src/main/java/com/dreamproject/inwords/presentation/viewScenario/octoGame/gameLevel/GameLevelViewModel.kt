package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import com.dreamproject.inwords.data.repository.GameRemoteRepository
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject

class GameLevelViewModel(private val gameRepository: GameRemoteRepository) : BasicViewModel() {
    private val _cardsDataSubject: Subject<CardsData> = BehaviorSubject.create()

    val navigateToGameLevel: Observable<CardsData>
        get() = _cardsDataSubject

    fun onGameLevelSelected(gameLevelId: Int) {
        compositeDisposable.clear()

        compositeDisposable.add(gameRepository.getLevel(gameLevelId)
                .map { CardsData(it.wordTranslations) }
                .subscribe(_cardsDataSubject::onNext))
    }

    fun cardsStream(): Single<CardsData> = _cardsDataSubject.firstOrError()
}
