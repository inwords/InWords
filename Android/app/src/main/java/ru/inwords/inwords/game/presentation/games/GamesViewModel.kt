package ru.inwords.inwords.game.presentation.games

import android.util.Log
import androidx.lifecycle.LiveData
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.disposables.Disposable
import io.reactivex.disposables.Disposables
import io.reactivex.functions.Function4
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.NavGraphDirections
import ru.inwords.inwords.R
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.managers.ResourceManager
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.interactor.ContinueGameInteractor
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.FirstZeroStarsLevelNotFoundException
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.home.recycler.SimpleStateWithVisibility
import ru.inwords.inwords.policy.domain.interactor.PolicyInteractor
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.translation.domain.interactor.TrainingInteractor

class GamesViewModel(
    private val gameInteractor: GameInteractor,
    private val continueGameInteractor: ContinueGameInteractor,
    private val trainingInteractor: TrainingInteractor,
    private val policyInteractor: PolicyInteractor,
    private val resourceManager: ResourceManager
) : BasicViewModel() {

    data class ScreenInfo(
        val continueGameState: GamePathToLevelState,
        val trainingState: SimpleStateWithVisibility,
        val gameInfos: List<GameInfo>
    )

    private val _toast = SingleLiveEvent<String>()
    val toast: LiveData<String> = _toast

    private val gameInfoClickedSubject = BehaviorSubject.createDefault(false to 0)

    private val continueGameReducer = ContinueGameReducer(GamePathToLevelState.Loading)
    private val trainingStateReducer = TrainingStateReducer(SimpleStateWithVisibility.Gone)

    private var getWordsForTrainingDisposable: Disposable = Disposables.empty()

    fun onViewCreated() {
        onSuggestionGameClicked(prefetch = true)
        onStartTrainingClicked(prefetch = true)
    }

    fun screenInfoStream(): Observable<ScreenInfo> = Observable.combineLatest(
        gameInteractor.getGamesInfo().map {
            if (it is Resource.Success) {
                it.data.gameInfos
            } else {
                emptyList()
            }
        },
        //this is for showing loading when adding words from game to dictionary
        gameInfoClickedSubject.scan(mutableMapOf(), { map: MutableMap<Int, Boolean>, clicked: Pair<Boolean, Int> ->
            map.values.remove(false)
            map[clicked.second] = clicked.first
            map
        }),
        continueGameReducer.state,
        trainingStateReducer.state,
        Function4 { gamesInfo: List<GameInfo>, map: MutableMap<Int, Boolean>, continueGameState, trainingState ->
            val gameInfos = gamesInfo.map {
                val loading = map[it.gameId]
                if (loading != null) {
                    it.copy(loading = loading)
                } else {
                    it
                }
            }

            ScreenInfo(
                continueGameState = continueGameState,
                trainingState = trainingState,
                gameInfos = gameInfos
            )
        }
    )

    fun navigateToGame(gameInfo: GameInfo) {
        navigateTo(GamesFragmentDirections.toGameLevelsFragment(gameInfo))
    }

    fun onSuggestionGameClicked(prefetch: Boolean = false) {
        fun handleError(throwable: Throwable?) {
            if (throwable is FirstZeroStarsLevelNotFoundException) {
                continueGameReducer.toGameEnd()
            } else {
                continueGameReducer.toError()
                if (!prefetch) {
                    _toast.setValue(resourceManager.getString(R.string.unable_to_load_exercise))
                }
            }

            Log.e(javaClass.simpleName, throwable?.message.orEmpty())
        }

        Single.fromCallable { continueGameInteractor.getFirstZeroStarsLevel() }
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { continueGameReducer.toLoading() }
            .subscribe({
                when (it) {
                    is Resource.Success -> {
                        if (!prefetch) {
                            navigateTo(GamesFragmentDirections.toGameLevelFragment(it.data.gameLevelInfo, it.data.game.gameId))
                        }
                        continueGameReducer.toReady(it.data)
                    }
                    is Resource.Error -> {
                        handleError(it.throwable)
                    }
                }
            }, {
                handleError(it)
            })
            .autoDispose()
    }

    fun onStartTrainingClicked(prefetch: Boolean = false) {
        getWordsForTrainingDisposable.dispose()

        getWordsForTrainingDisposable = trainingInteractor.getActualWordsForTraining()
            .subscribeOn(SchedulersFacade.io())
            .doOnSubscribe { trainingStateReducer.toLoading() }
            .subscribe({
                if (it.isNotEmpty()) {
                    if (!prefetch) {
                        navigateTo(GamesFragmentDirections.toCustomGameCreatorFragment(it.toTypedArray()))
                        trainingInteractor.clearCache()
                    }
                    trainingStateReducer.toReady()
                } else {
                    if (!prefetch) {
                        _toast.postValue(resourceManager.getString(R.string.unable_to_load_exercise))
                    }
                    trainingStateReducer.toGone()
                }
            }, {
                trainingStateReducer.toError()

                Log.e(javaClass.simpleName, it.message.orEmpty())
            })
            .autoDispose()
    }

    fun onSaveToDictionaryClicked(gameInfo: GameInfo) {
        gameInteractor.addWordsToUserDictionary(gameInfo.gameId)
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { gameInfoClickedSubject.onNext(true to gameInfo.gameId) }
            .doFinally { gameInfoClickedSubject.onNext(false to gameInfo.gameId) }
            .subscribe({
                _toast.setValue("Слова сохранены в словарь")
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                _toast.setValue("Сохранить слова в словарь не удалось")
            })
            .autoDispose()
    }

    fun checkPolicy(): Disposable = policyInteractor.getPolicyAgreementState()
        .subscribeOn(SchedulersFacade.io())
        .observeOn(SchedulersFacade.ui())
        .subscribe { agreed ->
            if (!agreed) {
                navigateTo(NavGraphDirections.actionGlobalToPolicyFragment())
            }
        }
}
