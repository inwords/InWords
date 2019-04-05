package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import com.dreamproject.inwords.data.dto.WordTranslation
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.interactor.game.GameInteractor
import com.dreamproject.inwords.presentation.viewScenario.BasicViewModel
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.Subject

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _cardsDataSubject: Subject<CardsData> = BehaviorSubject.create()

    fun onGameLevelSelected(gameLevelId: Int) {
        compositeDisposable.clear()

        compositeDisposable.add(gameInteractor.getLevel(gameLevelId)
                .map { cropWordTranslations(it.wordTranslations) }
                .map { CardsData(it) }
                .subscribe(_cardsDataSubject::onNext, Throwable::printStackTrace)) //TODO care
    }

    fun cardsStream(): Single<CardsData> = _cardsDataSubject.firstOrError()

    private fun cropWordTranslations(wordTranslations: List<WordTranslation>): List<WordTranslation> {
        return if (wordTranslations.size > 6) {
            wordTranslations.shuffled().subList(0, 6)
        } else {
            wordTranslations
        }
    }
}
