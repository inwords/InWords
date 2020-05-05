package ru.inwords.inwords.game.presentation.game_level

import ru.inwords.inwords.core.utils.addOrPut
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.game.domain.model.LevelMetric
import ru.inwords.inwords.game.domain.model.WordModel

class GameLevelOrchestrator(private val onCardFlipped: (WordModel) -> Unit) {
    private val stateMap = HashMap<WordModel, Boolean>()
    private var openedWord: OpenedWord? = null
    private var showingIncorrectCards: Boolean = false
    private val wordTranslationIdOpenCount = HashMap<WordModel, Int>()

    private var gameEndListener: ((LevelMetric) -> Unit)? = null
    private var flipState = FlipState()
        set(value) {
            field = value
            gameScene?.setState(flipState)
        }

    private var gameScene: GameScene? = null
    private var cardsData: CardsData? = null

    fun attachGameScene(gameScene: GameScene) {
        this.gameScene = gameScene
        gameScene.setOnClickListener(this::onNewClickEvent)
        gameScene.setState(flipState)
    }

    fun updateGameScene(cardsData: CardsData, forceUpdate: Boolean = false) {
        val gameScene = requireNotNull(gameScene) { "GameScene must be set before calling updateGameScene" }

        if (this.cardsData != cardsData || forceUpdate) {
            clearState()
            cardsData.words.forEach { stateMap[it] = false }
            flipState = FlipState(cardsData.words.map { false })
        }

        this.cardsData = cardsData

        gameScene.renderCards(cardsData, flipState)
    }

    fun setGameEndListener(listener: (LevelMetric) -> Unit) {
        gameEndListener = listener
    }

    private fun clearState() {
        wordTranslationIdOpenCount.clear()
        showingIncorrectCards = false
        openedWord = null
        stateMap.clear()
        gameScene?.clearState()
    }

    private fun markCardsPairOpened(word: WordModel, openedCardWord: WordModel) {
        stateMap[word] = true
        stateMap[openedCardWord] = true

        if (stateMap.values.all { it }) {
            gameEndListener?.invoke(LevelMetric(0, wordTranslationIdOpenCount)) //TODO care
        }
    }

    private fun onNewClickEvent(clickEvent: GameScene.ClickEvent) {
        val cardsData = gameScene?.cardsData ?: return

        if (!flipState.get(clickEvent.index) && !showingIncorrectCards) {
            flipState = flipState.updated(true, clickEvent.index)

            val word = clickEvent.word
            val openedCardWord = openedWord?.word

            wordTranslationIdOpenCount.addOrPut(word, 1)

            onCardFlipped(word)

            when {
                openedWord == null -> openedWord = OpenedWord(clickEvent.index, word) //first game_card opened

                openedCardWord != null && word == cardsData.getCorrespondingWord(openedCardWord) -> { //second correct game_card opened
                    openedWord = null
                    markCardsPairOpened(word, openedCardWord)
                }

                else -> { //second incorrect game_card opened
                    showingIncorrectCards = true
                    gameScene?.postDelayed(1100) {
                        flipState = flipState.updated(false, clickEvent.index, openedWord!!.index)
                        openedWord = null
                        showingIncorrectCards = false
                    }
                }
            }
        }
    }

    data class OpenedWord(val index: Int, val word: WordModel)

    data class FlipState(private val state: List<Boolean> = emptyList()) {
        fun updated(elem: Boolean, vararg indexes: Int) = copy(
            state = state.mapIndexed { i, existing -> if (i in indexes) elem else existing }
        )

        fun get(index: Int) = state.getOrNull(index) ?: false
    }
}