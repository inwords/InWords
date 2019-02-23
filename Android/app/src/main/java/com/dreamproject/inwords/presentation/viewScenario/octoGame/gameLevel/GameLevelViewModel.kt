package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import com.dreamproject.inwords.data.repository.GameRepository
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject

class GameLevelViewModel(private val gameRepository: GameRepository) : BasicViewModel() {
    private val _navigateToGameLevelSubject: Subject<CardsData> = BehaviorSubject.create()

    val navigateToGameLevel: Observable<CardsData>
        get() = _navigateToGameLevelSubject

    fun onGameLevelSelected(gameLevelInfoId: Int) {
        compositeDisposable.clear()

        compositeDisposable.add(gameRepository.getLevel(gameLevelInfoId)
                .map { CardsData(it.wordTranslations) }
                .subscribe(_navigateToGameLevelSubject::onNext))
    }

    fun cardsStream(): Single<CardsData> = _navigateToGameLevelSubject.firstOrError()
}
