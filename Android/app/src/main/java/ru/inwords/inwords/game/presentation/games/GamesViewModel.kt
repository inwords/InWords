package ru.inwords.inwords.game.presentation.games

import android.util.Log
import androidx.lifecycle.LiveData
import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.model.GameInfo
import ru.inwords.inwords.presentation.SingleLiveEvent
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel

class GamesViewModel(private val gameInteractor: GameInteractor) : BasicViewModel() {
    private val gameInfoClickedSubject = BehaviorSubject.createDefault(false to 0)

    private val toastLiveData = SingleLiveEvent<Boolean>()
    val toast: LiveData<Boolean> = toastLiveData

    fun screenInfoStream() = Observable.combineLatest(
        gameInteractor.getGamesInfo().map {
            if (it is Resource.Success) {
                it.data.gameInfos
            } else {
                emptyList()
            }
        },
        gameInfoClickedSubject.scan(mutableMapOf(), { map: MutableMap<Int, Boolean>, clicked: Pair<Boolean, Int> ->
            map.values.remove(false)
            map[clicked.second] = clicked.first
            map
        }),
        BiFunction { gamesInfo: List<GameInfo>, map: MutableMap<Int, Boolean> ->
            gamesInfo.map {
                val loading = map[it.gameId]
                if (loading != null) {
                    it.copy(loading = loading)
                } else {
                    it
                }
            }
        }
    )

    fun onGameRemoved(gameInfo: GameInfo) {
        Log.d("onGameRemoved", gameInfo.toString()) //TODO
    }

    fun navigateToGame(gameInfo: GameInfo) {
        navigateTo(GamesFragmentDirections.actionGamesFragmentToGameLevelsFragment(gameInfo))
    }

    fun onSaveToDictionaryClicked(gameInfo: GameInfo) {
        gameInteractor.addWordsToUserDictionary(gameInfo.gameId)
            .subscribeOn(SchedulersFacade.io())
            .observeOn(SchedulersFacade.ui())
            .doOnSubscribe { gameInfoClickedSubject.onNext(true to gameInfo.gameId) }
            .doFinally { gameInfoClickedSubject.onNext(false to gameInfo.gameId) }
            .subscribe({
                toastLiveData.setValue(true)
            }, {
                Log.e(javaClass.simpleName, it.message.orEmpty())
                toastLiveData.setValue(false)
            })
            .autoDispose()
    }
}
