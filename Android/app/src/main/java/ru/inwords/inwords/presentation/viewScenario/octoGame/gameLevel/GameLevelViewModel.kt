package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel

import io.reactivex.Observable
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.domain.CardsData
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _cardsDataSubject: Subject<Resource<CardsData>> = BehaviorSubject.create()
    private val _navigationSubject: Subject<FromGameEndPathsEnum> = PublishSubject.create()

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

    fun navigationStream(): Observable<FromGameEndPathsEnum> = _navigationSubject

    fun onNewNavCommand(path: FromGameEndPathsEnum) {
        _navigationSubject.onNext(path)
    }

    fun cardsStream(): Observable<Resource<CardsData>> = _cardsDataSubject

    fun onGameEnd(game: Game, levelId: Int, cardOpenClicks: Int) {
        gameInteractor.getScore(game, levelId, cardOpenClicks).subscribe()
    }
}
