package ru.inwords.inwords.game.presentation.game_level

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.disposables.Disposable
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.core.Event
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.data.repository.SettingsRepository
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.game.presentation.game_level.FromGameEndEventsEnum.*
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository

class GameLevelViewModel(
    private val gameInteractor: GameInteractor,
    private val continueGameInteractor: ContinueGameInteractor,
    private val ttsRepository: TtsRepository,
    private val settingsRepository: SettingsRepository
) : BasicViewModel() {
    private val _navigationFromGameEnd = SingleLiveEvent<FromGameEndEventsEnum>()
    private val ttsSubject = PublishSubject.create<Resource<String>>()
    private val showProgressMutableLiveData = MutableLiveData<Event<Boolean>>()

    val navigationFromGameEnd: LiveData<FromGameEndEventsEnum> = _navigationFromGameEnd
    val ttsStream: Observable<Resource<String>> = ttsSubject
    val showProgress: LiveData<Event<Boolean>> = showProgressMutableLiveData

    private var ttsDisposable: Disposable? = null

    private val gameLevelOrchestrator = GameLevelOrchestrator(onCardFlipped = { ttsWordModel(it) })
        .apply {
            setGameEndListener { showGameEndDialog(it) }
        }

    private lateinit var game: Game
    private var currentLevelIndex = 0

    fun onAttachGameScene(gameScene: GameScene) {
        gameScene.scaleGame = settingsRepository.scaleGame
        gameLevelOrchestrator.attachGameScene(gameScene)
    }

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo, forceUpdate: Boolean = false) {
        showProgressMutableLiveData.postValue(Event(true))

        compositeDisposable.clear()

        currentLevelIndex = gameLevelInfo.level - 1

        gameInteractor.getGame(gameId)
            .firstElement()
            .doOnSuccess { storeGame(it) }
            .flatMap { gameInteractor.getLevel(gameLevelInfo.levelId).firstElement() }
            .map {
                when (it) {
                    is Resource.Success -> Resource.Success(CardsData(it.data.wordTranslations))
                    is Resource.Loading -> Resource.Loading<CardsData>()
                    is Resource.Error -> Resource.Error(it.message, it.throwable)
                }
            }
            .observeOn(SchedulersFacade.ui())
            .doFinally { showProgressMutableLiveData.value = Event(false) }
            .subscribe {
                if (it is Resource.Success) {
                    gameLevelOrchestrator.updateGameScene(it.data, forceUpdate)
                }
            }
            .autoDispose()
    }

    private fun storeGame(gameResource: Resource<Game>) {
        when (gameResource) {
            is Resource.Success -> game = gameResource.data.copy(gameLevelInfos = gameResource.data.gameLevelInfos.sortedBy { g -> g.level })
            is Resource.Error -> Log.e("GameLevelViewModel", gameResource.message.orEmpty())  //TODO
        }
    }

    /**
     * should be called on background thread
     */
    private fun queryContinueGame() {
        getCurrentLevelInfo()?.let {
            when (val queryResultResource = continueGameInteractor.queryContinueGame(game, it)) {
                is Resource.Success -> {
                    when (val queryResult = queryResultResource.data) {
                        is ContinueGameQueryResult.NextLevelInfo -> {
                            if (queryResult.isLast) {
                                //TODO show congrats screen with action "go to next"
                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                                _navigationFromGameEnd.postValue(NEXT)
                            } else {
                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                                _navigationFromGameEnd.postValue(NEXT)
                            }
                        }
                        ContinueGameQueryResult.NoMoreLevels -> {
                            _navigationFromGameEnd.postValue(GAMES_FRAGMENT) //TODO show congrats screen
                        }
                    }
                }
                else -> Log.wtf(javaClass.simpleName, "getCurrentLevelInfo should not be null")
            }
        }
    }

    fun getCurrentGameId() = game.gameId
    fun getCurrentLevelInfo() = game.gameLevelInfos.getOrNull(currentLevelIndex)

    fun onNewEventCommand(path: FromGameEndEventsEnum) {
        val currentLevelInfo = getCurrentLevelInfo() ?: return

        when (path) {
            NEXT -> {
                Completable.fromAction { queryContinueGame() }
                    .subscribeOn(SchedulersFacade.io())
                    .subscribe({}, { t -> Log.wtf(javaClass.simpleName, t.message.orEmpty()) })
                    .autoDispose()
            }
            REFRESH -> {
                _navigationFromGameEnd.postValue(path)
                onGameLevelSelected(game.gameId, currentLevelInfo, true)
            }
            else -> _navigationFromGameEnd.postValue(path)
        }
    }

    fun getScore(levelMetric: LevelMetric): Single<Resource<LevelScore>> {
        return gameInteractor.getScore(game, levelMetric)
    }

    private fun ttsWordModel(wordModel: WordModel) {
        if (wordModel.isForeign) {
            ttsDisposable?.dispose()

            showProgressMutableLiveData.postValue(Event(true))
            ttsDisposable = ttsRepository.synthesize(wordModel.word)
                .subscribeOn(SchedulersFacade.io())
                .map { Resource.Success(it.absolutePath) as Resource<String> }
                .onErrorReturn { Resource.Error(it.message, it) }
                .doFinally { showProgressMutableLiveData.postValue(Event(false)) }
                .subscribe({
                    ttsSubject.onNext(it)
                }, {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                })
                .autoDispose()
        }
    }

    private fun showGameEndDialog(levelMetric: LevelMetric) {
        val levelId = getCurrentLevelInfo()?.levelId ?: return

        navigateTo(
            GameLevelFragmentDirections.actionGameLevelFragmentToGameEndBottomSheet(
                levelMetric.copy(levelId = levelId)
            )
        )
    }
}
