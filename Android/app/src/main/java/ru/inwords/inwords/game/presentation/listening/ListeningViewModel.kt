package ru.inwords.inwords.game.presentation.listening

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.LiveDataReactiveStreams
import io.reactivex.Observable
import io.reactivex.processors.PublishProcessor
import io.reactivex.subjects.BehaviorSubject
import ru.inwords.inwords.core.SingleLiveEvent
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.core.rxjava.SchedulersFacade
import ru.inwords.inwords.core.utils.addOrPut
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.game.domain.ListeningLevelData
import ru.inwords.inwords.game.domain.UsersChoice
import ru.inwords.inwords.game.domain.interactor.GameInteractor
import ru.inwords.inwords.game.domain.makeListeningData
import ru.inwords.inwords.game.domain.model.*
import ru.inwords.inwords.presentation.view_scenario.BasicViewModel
import ru.inwords.inwords.texttospeech.TtsDelegate
import ru.inwords.inwords.texttospeech.data.repository.TtsRepository
import java.util.concurrent.TimeUnit

class ListeningViewModel(
    private val gameInteractor: GameInteractor,
    ttsRepository: TtsRepository
) : BasicViewModel() {
    private val ttsDelegate = TtsDelegate(ttsRepository)
    val ttsStream: Observable<Resource<String>> = ttsDelegate.ttsStream

    private val _progress = PublishProcessor.create<Boolean>()
    val progress: LiveData<Boolean> = LiveDataReactiveStreams.fromPublisher(
        _progress.onBackpressureLatest().throttleLast(75, TimeUnit.MILLISECONDS)
    )

    private val _trainingData = BehaviorSubject.create<List<ListeningLevelData>>()
    val trainingData = _trainingData.applyDiffUtil()

    private val _usersChoice = SingleLiveEvent<UsersChoice>()
    val usersChoice: LiveData<UsersChoice> = _usersChoice

    private var trainingState: TrainingState = TrainingState.empty()

    private val usersChoices = mutableListOf<UsersChoice>()

    private var cardsData: CardsData? = null
    private var game: Game? = null
    private var currentLevelIndex = 0

    fun setTrainingState(trainingState: TrainingState) {
        this.trainingState = trainingState
    }

    fun onWordChosen(usersChoice: UsersChoice) {
        if (!usersChoice.isCorrect()) {
            _trainingData.value?.let {
                val newList = it.toMutableList().apply {
                    add(usersChoice.listeningLevelData.copy(levelIndex = it.size))
                }.toList()
                _trainingData.onNext(newList)
            }
        }
        usersChoices.add(usersChoice)
        _usersChoice.setValue(usersChoice)
    }

    fun onListeningEnd() {
        val gameLevelInfo = getCurrentLevelInfo() ?: return
        val gameId = getCurrentGameId() ?: return

        val metric = buildLevelMetricFrom(gameLevelInfo.levelId, usersChoices)

        navigateTo(
            ListeningFragmentDirections.toGameLevelFragment(
                gameLevelInfo, gameId, trainingState, cardsData, metric
            )
        )
    }

    fun buildLevelMetricFrom(levelId: Int, usersChoices: List<UsersChoice>): LevelMetric {
        val wordOpenCount = HashMap<WordModel, Int>()
        usersChoices.forEach {
            wordOpenCount.addOrPut(it.chosenWord, 1)
        }
        return LevelMetric(levelId, wordOpenCount)
    }

    fun onGameLevelSelected(gameId: Int, gameLevelInfo: GameLevelInfo) {
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
                    cardsData = it.data
                    _trainingData.onNext(it.data.makeListeningData().levels)
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

    fun getCurrentGameId() = game?.gameId
    fun getCurrentLevelInfo() = game?.gameLevelInfos?.getOrNull(currentLevelIndex)

    fun ttsWordModel(wordModel: WordModel) {
        if (wordModel.isForeign) {
            ttsDelegate.ttsWordModel(wordModel) {
                _progress.onNext(it)
            }.autoDispose()
        }
    }
}
