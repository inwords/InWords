package ru.inwords.inwords.game.presentation.game_level

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import io.reactivex.Completable
import io.reactivex.Maybe
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.processors.PublishProcessor
import ru.inwords.inwords.GraphGameLevelDirections
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.texttospeech.TtsDelegate
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import java.util.concurrent.TimeUnit

class GameLevelViewModel(
    private val gameInteractor: GameInteractor,
    private val continueGameInteractor: ContinueGameInteractor,
    ttsRepository: TtsRepository,
    private val settingsRepository: SettingsRepository
) : BasicViewModel() {

    private val ttsDelegate = TtsDelegate(ttsRepository)
    val ttsStream: Observable<Resource<String>> = ttsDelegate.ttsStream

    private val _progress = PublishProcessor.create<Boolean>()
    val progress: LiveData<Boolean> = LiveDataReactiveStreams.fromPublisher(
        _progress.onBackpressureLatest().throttleLast(75, TimeUnit.MILLISECONDS)
    )

    private var trainingState: TrainingState = TrainingState.empty()
    private var listeningMetric: LevelMetric? = null

    private val gameLevelOrchestrator: GameLevelOrchestrator = GameLevelOrchestrator(onCardFlipped = { ttsWordModel(it) })
        .apply {
            setGameEndListener { showGameEndDialog(it) }
        }

    private var game: Game? = null
    private var currentLevelIndex = 0

    fun setTrainingState(trainingState: TrainingState) {
        this.trainingState = trainingState
    }

    fun setListeningMetric(listeningMetric: LevelMetric?) {
        this.listeningMetric = listeningMetric
    }

    fun onAttachGameScene(gameScene: GameScene) {
        gameScene.scaleGame = settingsRepository.scaleGame
        gameLevelOrchestrator.attachGameScene(gameScene)
    }

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo, cardsData: CardsData? = null, forceUpdate: Boolean = false) {
        compositeDisposable.clear()

        _progress.onNext(true)

        currentLevelIndex = gameLevelInfo.level - 1

        gameInteractor.getGame(gameId)
            .firstElement()
            .doOnSuccess { storeGame(it) }
            .flatMap {
                if (cardsData != null) {
                    Maybe.just(Resource.Success(cardsData))
                } else {
                    gameInteractor.getLevel(gameLevelInfo.levelId).firstElement()
                        .map {
                            when (it) {
                                is Resource.Success -> Resource.Success(CardsData(it.data.wordTranslations))
                                is Resource.Loading -> Resource.Loading<CardsData>()
                                is Resource.Error -> Resource.Error(it.message, it.throwable)
                            }
                        }
                }
            }
            .observeOn(SchedulersFacade.ui())
            .doFinally { _progress.onNext(false) }
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
        val game = game ?: return

        getCurrentLevelInfo()?.let {
            when (val queryResultResource = continueGameInteractor.queryContinueGame(game, it, trainingState.mode)) {
                is Resource.Success -> {
                    when (val queryResult = queryResultResource.data) {
                        is ContinueGameQueryResult.NextLevelInfo -> {
                            if (queryResult.isLast) {
                                //TODO show congrats screen with action "go to next"
                                navigateToListeningFragment(queryResult.levelInfo, queryResult.game.gameId, trainingState)
//                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                            } else {
                                navigateToListeningFragment(queryResult.levelInfo, queryResult.game.gameId, trainingState)
//                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                            }
                        }
                        ContinueGameQueryResult.NoMoreLevels -> {
                            navigateToGamesFragment() //TODO show congrats screen
                        }
                    }
                }
                else -> Log.wtf(javaClass.simpleName, "getCurrentLevelInfo should not be null")
            }
        }
    }

    fun getCurrentGameId() = game?.gameId
    fun getCurrentLevelInfo() = game?.gameLevelInfos?.getOrNull(currentLevelIndex)

    fun getScore(trainingMetric: TrainingMetric): Single<Resource<TrainingScore>> {
        val game = game ?: return Single.error(IllegalStateException("game is null but called getScore"))

        return gameInteractor.getScore(game, trainingMetric)
    }

    private fun ttsWordModel(wordModel: WordModel) {
        if (wordModel.isForeign) {
            ttsDelegate.ttsWordModel(wordModel) {
                _progress.onNext(it)
            }.autoDispose()
        }
    }

    fun onNextButtonClicked() {
        Completable.fromAction { queryContinueGame() }
            .subscribeOn(SchedulersFacade.io())
            .subscribe({}, { t -> Log.wtf(javaClass.simpleName, t.message.orEmpty()) })
            .autoDispose()
    }

    fun onRetryButtonCLicked() {
        val currentLevelInfo = getCurrentLevelInfo() ?: return
        val gameId = getCurrentGameId() ?: return

        navigateToListeningFragment(currentLevelInfo, gameId, trainingState)
//        onGameLevelSelected(gameId, currentLevelInfo, forceUpdate = true)
    }

    private fun showGameEndDialog(levelMetric: HashMap<WordModel, Int>) {
        val levelId = getCurrentLevelInfo()?.levelId ?: return
        val listeningMetric = listeningMetric ?: return
        val game = game ?: return

        navigateTo(
            GraphGameLevelDirections.actionGlobalToGameEndBottomSheet(
                TrainingMetric(levelId = levelId, audioMetric = listeningMetric, closedCardsMetric = LevelMetric(levelId, levelMetric)),
                game
            )
        )
    }

    private fun navigateToGamesFragment() = navigateTo(GameLevelFragmentDirections.actionPopUpToGamesFragment())

    private fun navigateToListeningFragment(gameLevelInfo: GameLevelInfo, gameId: Int, trainingState: TrainingState) {
        navigateTo(
            GameLevelFragmentDirections.toListeningFragment(gameLevelInfo, gameId, trainingState, null)
        )
    }
}
