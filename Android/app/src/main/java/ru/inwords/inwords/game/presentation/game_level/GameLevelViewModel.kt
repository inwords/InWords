package ru.inwords.inwords.game.presentation.game_level

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import androidx.navigation.NavDirections
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.disposables.Disposable
import io.reactivex.processors.PublishProcessor
import io.reactivex.subjects.PublishSubject
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.main_activity.data.repository.SettingsRepository
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import java.util.concurrent.TimeUnit

class GameLevelViewModel(
    private val gameInteractor: GameInteractor,
    private val continueGameInteractor: ContinueGameInteractor,
    private val ttsRepository: TtsRepository,
    private val settingsRepository: SettingsRepository
) : BasicViewModel() {

    private val _navigateFromGameEnd = SingleLiveEvent<NavDirections>()
    val navigateFromGameEnd: LiveData<NavDirections> = _navigateFromGameEnd

    private val ttsSubject = PublishSubject.create<Resource<String>>()
    val ttsStream: Observable<Resource<String>> = ttsSubject

    private val _progress = PublishProcessor.create<Boolean>()
    val progress: LiveData<Boolean> = LiveDataReactiveStreams.fromPublisher(
        _progress.onBackpressureLatest().throttleLast(75, TimeUnit.MILLISECONDS)
    )

    private var ttsDisposable: Disposable? = null

    private val gameLevelOrchestrator = GameLevelOrchestrator(onCardFlipped = { ttsWordModel(it) })
        .apply {
            setGameEndListener { showGameEndDialog(it) }
        }

    private var game: Game? = null
    private var currentLevelIndex = 0

    fun onAttachGameScene(gameScene: GameScene) {
        gameScene.scaleGame = settingsRepository.scaleGame
        gameLevelOrchestrator.attachGameScene(gameScene)
    }

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo, forceUpdate: Boolean = false) {
        _progress.onNext(true)

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
            when (val queryResultResource = continueGameInteractor.queryContinueGame(game, it)) {
                is Resource.Success -> {
                    when (val queryResult = queryResultResource.data) {
                        is ContinueGameQueryResult.NextLevelInfo -> {
                            if (queryResult.isLast) {
                                //TODO show congrats screen with action "go to next"
                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                                navigateOutOfGameEndBottomShit()
                            } else {
                                onGameLevelSelected(queryResult.game.gameId, queryResult.levelInfo)
                                navigateOutOfGameEndBottomShit()
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

    fun onHomeButtonClicked() {
        navigateToHomeFragment()
    }

    fun onBackButtonClicked() {
        navigateOutOfGameLevel()
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

        onGameLevelSelected(gameId, currentLevelInfo, true)
        navigateOutOfGameEndBottomShit()
    }

    fun getScore(levelMetric: LevelMetric): Single<Resource<LevelScore>> {
        val game = game ?: return Single.error(IllegalStateException("game is null but called getScore"))

        return gameInteractor.getScore(game, levelMetric)
    }

    private fun ttsWordModel(wordModel: WordModel) {
        if (wordModel.isForeign) {
            ttsDisposable?.dispose()

            _progress.onNext(true)
            ttsDisposable = ttsRepository.synthesize(wordModel.word)
                .subscribeOn(SchedulersFacade.io())
                .map { Resource.Success(it.absolutePath) as Resource<String> }
                .onErrorReturn { Resource.Error(it.message, it) }
                .observeOn(SchedulersFacade.ui())
                .doFinally { _progress.onNext(false) }
                .subscribe({
                    ttsSubject.onNext(it)
                }, {
                    Log.e(javaClass.simpleName, it.message.orEmpty())
                })
                .autoDispose()
        }
    }

    private fun showGameEndDialog(levelMetric: HashMap<WordModel, Int>) {
        val levelId = getCurrentLevelInfo()?.levelId ?: return

        navigateTo(GameLevelFragmentDirections.toGameEndBottomSheet(LevelMetric(levelId, levelMetric)))
    }

    private fun navigateToGamesFragment() = navigateTo(GameEndBottomSheetDirections.actionPopUpToGamesFragment())
    private fun navigateToHomeFragment() = navigateTo(NavGraphDirections.actionGlobalPopToStartDestination())
    private fun navigateOutOfGameLevel() = navigateTo(GameEndBottomSheetDirections.actionPopUpToGameLevelFragmentInclusive())
    private fun navigateOutOfGameEndBottomShit() = navigateTo(GameEndBottomSheetDirections.actionPop())
}
