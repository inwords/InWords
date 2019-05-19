package ru.inwords.inwords.presentation.viewScenario.octoGame.gameLevel

import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TableRow
import io.reactivex.Observable
import kotlinx.android.synthetic.main.fragment_game_level.*
import kotlinx.android.synthetic.main.game_card_front.view.*
import ru.inwords.flipview.FlipView
import ru.inwords.inwords.R
import ru.inwords.inwords.core.util.SchedulersFacade
import ru.inwords.inwords.data.dto.game.GameLevelInfo
import ru.inwords.inwords.domain.CardsData
import ru.inwords.inwords.domain.GAME_ID
import ru.inwords.inwords.domain.GAME_LEVEL_INFO
import ru.inwords.inwords.domain.model.Resource
import ru.inwords.inwords.domain.util.INVALID_ID
import ru.inwords.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import ru.inwords.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import java.util.concurrent.TimeUnit
import kotlin.math.ceil


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, OctoGameViewModelFactory>() {
    //region arguments
    private lateinit var gameLevelInfo: GameLevelInfo
    private var gameId: Int = INVALID_ID
    //endregion arguments

    private var gameEndBottomSheetFragment: GameEndBottomSheet? = null

    private val stateMap = HashMap<String, Boolean>()
    private var openedCard: FlipView? = null
    private var showingIncorrectCards: Boolean = false
    private var cardOpenClicksCount = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = savedInstanceState?.getSerializable(GAME_LEVEL_INFO) as? GameLevelInfo
                ?: arguments?.getSerializable(GAME_LEVEL_INFO) as GameLevelInfo

        gameId = savedInstanceState?.getInt(GAME_ID)
                ?: arguments?.getInt(GAME_ID) ?: INVALID_ID

        viewModel.onGameLevelSelected(gameId, gameLevelInfo)
    }

    override fun onSaveInstanceState(outState: Bundle) {
        outState.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        outState.putInt(GAME_ID, gameId)
        super.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        compositeDisposable.add(viewModel.navigationStream().subscribe {
            gameEndBottomSheetFragment?.dismiss()

            when (it) {
                FromGameEndEventsEnum.HOME -> navController.navigate(R.id.action_global_mainFragment)
                FromGameEndEventsEnum.BACK -> navController.navigate(R.id.action_gameLevelFragment_pop)
                else -> Unit
            }
        })

        compositeDisposable.add(viewModel
                .cardsStream()
                .observeOn(SchedulersFacade.ui())
                .subscribe(::render, Throwable::printStackTrace))
    }

    private fun render(cardsDataResource: Resource<CardsData>) {
//        showIntro(cardsData)
        clearState()

        if (cardsDataResource.success()) {
            val cardsData = cardsDataResource.data!!

            cardsData.words.forEach { stateMap[it] = false }

            renderCards(cardsData)
        } //TODO add else branch
    }

    private fun clearState() {
        cardOpenClicksCount = 0
        showingIncorrectCards = false
        openedCard = null
        stateMap.clear()
        table.removeAllViews()
    }

    private fun renderCards(cardsData: CardsData) {
        val words = cardsData.words

        val cols = when (words.size) {
            in 4..6 -> 2
            else -> 3
        }
        val rows = ceil(words.size / cols.toFloat()).toInt()
        for (i in 0 until rows) {
            val tableRow = TableRow(context)
            tableRow.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT)
            tableRow.gravity = Gravity.CENTER

            for (j in 0 until cols) {
                val cardNum = j + i * cols
                if (cardNum >= words.size) {
                    break
                }

                val flipView = layoutInflater.inflate(R.layout.game_card, tableRow, false) as FlipView

                with(flipView) {
                    flip(true)

                    val word = words[cardNum]

                    tag = word
                    frontText.text = word
                    setOnClickListener(CardClickListener(cardsData))
                }

                tableRow.addView(flipView, j)
            }

            table.addView(tableRow, i)
        }
    }

    private fun markCardsPairOpened(word: String, openedCardWord: String) {
        stateMap[word] = true
        stateMap[openedCardWord] = true

        if (stateMap.values.all { it }) {
            showGameEndDialog()

            viewModel.onGameEnd(cardOpenClicksCount, stateMap.size)
        }
    }

    private fun showGameEndDialog() {
        val nextLevelAvailable = viewModel.getNextLevelInfo().success()

        gameEndBottomSheetFragment = GameEndBottomSheet.instance(gameLevelInfo.levelId, nextLevelAvailable).also {
            supportFragmentInjector().inject(it)
            it.show(childFragmentManager, GameEndBottomSheet::class.java.canonicalName)
        }
    }

    private inner class CardClickListener(private val cardsData: CardsData) : View.OnClickListener {
        override fun onClick(v: View?) {
            if (v is FlipView && v.isFlipped && !showingIncorrectCards) {
                cardOpenClicksCount++

                v.flip(false)

                val word = v.tag as String
                val openedCardWord = openedCard?.tag as String?

                when {
                    openedCard == null -> openedCard = v //first game_card opened

                    openedCardWord != null && word == cardsData.getCorrespondingWord(openedCardWord) -> { //second correct game_card opened
                        openedCard = null
                        markCardsPairOpened(word, openedCardWord)
                    }

                    else -> { //second incorrect game_card opened
                        showingIncorrectCards = true
                        compositeDisposable.add(Observable.timer(1100, TimeUnit.MILLISECONDS)
                                .observeOn(SchedulersFacade.ui())
                                .subscribe {
                                    v.flip(true)
                                    openedCard?.flip(true)
                                    openedCard = null
                                    showingIncorrectCards = false
                                })
                    }
                }
            }
        }
    }

    override fun getLayout() = R.layout.fragment_game_level

    override fun getClassType() = GameLevelViewModel::class.java
}