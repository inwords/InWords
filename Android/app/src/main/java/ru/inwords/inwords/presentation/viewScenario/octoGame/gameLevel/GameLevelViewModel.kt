package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel

import android.util.Log
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.subjects.BehaviorSubject
import io.reactivex.subjects.PublishSubject
import io.reactivex.subjects.Subject
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.data.dto.game.LevelScoreRequest
import ru.inwords.inwords.domain.CardsData
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.presentation.viewScenario.BasicViewModel
import ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel.FromGameEndEventsEnum.*

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _cardsDataSubject: Subject<Resource<CardsData>> = BehaviorSubject.create()
    private val _navigationSubject: Subject<FromGameEndEventsEnum> = PublishSubject.create()

    private lateinit var game: Game
    private var currentLevelIndex = 0

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo) {
        compositeDisposable.clear()

        currentLevelIndex = gameLevelInfo.level - 1

        compositeDisposable.add(gameInteractor.getLevel(gameLevelInfo.levelId)
                .map {
                    when (it) {
                        is Resource.Success -> Resource.Success(CardsData(it.data.wordTranslations))
                        is Resource.Loading -> Resource.Loading<CardsData>()
                        is Resource.Error -> Resource.Error(it.message, it.throwable)
                    }
                }
                .subscribe(_cardsDataSubject::onNext))

        compositeDisposable.add(gameInteractor
                .getGame(gameId)
                .map { it.gameResource }
                .subscribe { storeGame(it) }) //TODO
    }

    private fun storeGame(gameResource: Resource<Game>) {
        when (gameResource) {
            is Resource.Success -> game = gameResource.data.copy(gameLevelInfos = gameResource.data.gameLevelInfos.sortedBy { g -> g.level })
            is Resource.Error -> Log.d("GameLevelViewModel", gameResource.message.orEmpty())  //TODO
        }
    }

    private fun selectNextLevel() {
        val nextLevelInfo = getNextLevelInfo()
        if (nextLevelInfo is Resource.Success) {
            onGameLevelSelected(game.gameId, nextLevelInfo.data)
        } else {
            _navigationSubject.onNext(BACK) //TODO its the end of current game
        }
    }

    fun getNextLevelInfo(): Resource<GameLevelInfo> {
        val gameLevelInfos = game.gameLevelInfos.sortedBy { it.level }
        val nextLevelIndex = currentLevelIndex + 1

        return if (nextLevelIndex < gameLevelInfos.size) {
            Resource.Success(gameLevelInfos[nextLevelIndex])
        } else {
            Resource.Error()
        }
    }

    fun getCurrentLevelInfo() = game.gameLevelInfos[currentLevelIndex]

    fun onNewEventCommand(path: FromGameEndEventsEnum) {
        _navigationSubject.onNext(path)

        when (path) {
            NEXT -> selectNextLevel()
            REFRESH -> onGameLevelSelected(game.gameId, getCurrentLevelInfo()) //TODO only flip cards
            else -> Unit
        }
    }

    fun cardsStream(): Observable<Resource<CardsData>> = _cardsDataSubject

    fun navigationStream(): Observable<FromGameEndEventsEnum> = _navigationSubject

    fun getScore(cardOpenClicks: Int, wordsCount: Int): Single<Resource<LevelScore>> {
        return gameInteractor.getScore(game, LevelScoreRequest(getCurrentLevelInfo().levelId, cardOpenClicks, wordsCount))
    }
}
