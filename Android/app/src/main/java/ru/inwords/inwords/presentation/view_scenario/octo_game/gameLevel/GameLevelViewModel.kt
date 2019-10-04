package ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Single
import ru.inwords.inwords.core.Resource
import ru.inwords.inwords.core.util.Event
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.Game
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.data.dto.game.LevelScore
import ru.inwords.inwords.domain.CardsData
import ru.inwords.inwords.domain.interactor.game.GameInteractor
import ru.inwords.inwords.domain.model.GameModel
import ru.inwords.inwords.domain.model.LevelResultModel
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.presentation.view_scenario.octo_game.gameLevel.FromGameEndEventsEnum.*

class GameLevelViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val _navigationFromGameEnd = MutableLiveData<Event<FromGameEndEventsEnum>>()
    private val _levelResult = MutableLiveData<Event<LevelResultModel>>()

    val levelResult: LiveData<Event<LevelResultModel>> = _levelResult
    val navigationFromGameEnd: LiveData<Event<FromGameEndEventsEnum>> = _navigationFromGameEnd

    private val gameLevelOrchestrator = GameLevelOrchestrator().apply {
        setGameEndListener { _levelResult.postValue(Event(it)) }
    }

    private lateinit var game: Game
    private var currentLevelIndex = 0

    fun onAttachGameScene(gameScene: GameScene) {
        gameLevelOrchestrator.attachGameScene(gameScene)
    }

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo, forceUpdate: Boolean = false) {
        compositeDisposable.clear()

        currentLevelIndex = gameLevelInfo.level - 1

        gameInteractor.getGame(gameId)
            .doOnNext { storeGame(it) }
            .flatMap { gameInteractor.getLevel(gameLevelInfo.levelId) }
            .map {
                when (it) {
                    is Resource.Success -> Resource.Success(CardsData(it.data.wordTranslations))
                    is Resource.Loading -> Resource.Loading<CardsData>()
                    is Resource.Error -> Resource.Error(it.message, it.throwable)
                }
            }
            .observeOn(SchedulersFacade.ui())
            .subscribe {
                if (it is Resource.Success) {
                    gameLevelOrchestrator.updateGameScene(it.data, forceUpdate)
                }
            }
            .autoDispose()
    }

    private fun storeGame(gameResource: Resource<GameModel>) {
        when (gameResource) {
            is Resource.Success -> game = gameResource.data.game.copy(gameLevelInfos = gameResource.data.game.gameLevelInfos.sortedBy { g -> g.level })
            is Resource.Error -> Log.e("GameLevelViewModel", gameResource.message.orEmpty())  //TODO
        }
    }

    private fun selectNextLevel() {
        val nextLevelInfo = getNextLevelInfo()
        if (nextLevelInfo is Resource.Success) {
            onGameLevelSelected(game.gameId, nextLevelInfo.data)
        } else {
            _navigationFromGameEnd.postValue(Event(BACK)) //TODO its the end of current game
        }
    }

    fun getNextLevelInfo(): Resource<GameLevelInfo> {
        val gameLevelInfos = game.gameLevelInfos
        val nextLevelIndex = currentLevelIndex + 1

        return if (nextLevelIndex < gameLevelInfos.size) {
            Resource.Success(gameLevelInfos[nextLevelIndex])
        } else {
            Resource.Error("", RuntimeException("")) //TODO normal exception
        }
    }

    fun getCurrentLevelInfo() = game.gameLevelInfos.getOrNull(currentLevelIndex)

    fun onNewEventCommand(path: FromGameEndEventsEnum) {
        val currentLevelInfo = getCurrentLevelInfo() ?: return

        _navigationFromGameEnd.postValue(Event(path))

        when (path) {
            NEXT -> selectNextLevel()
            REFRESH -> onGameLevelSelected(game.gameId, currentLevelInfo, true)
            else -> Unit
        }
    }

    fun getScore(levelResultModel: LevelResultModel): Single<Resource<LevelScore>> {
        return gameInteractor.getScore(game, levelResultModel)
    }
}
