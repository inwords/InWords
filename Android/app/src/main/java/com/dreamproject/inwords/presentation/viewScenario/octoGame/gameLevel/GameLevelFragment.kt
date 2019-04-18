package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TableRow
import androidx.cardview.widget.CardView
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.Game
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.GAME
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.domain.model.Resource
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import com.dreamproject.inwords.presentation.viewScenario.octoGame.OctoGameViewModelFactory
import eu.davidea.flipview.FlipView
import io.reactivex.Observable
import kotlinx.android.synthetic.main.fragment_game_level.*
import kotlinx.android.synthetic.main.game_card.view.*
import kotlinx.android.synthetic.main.game_card_front.view.*
import java.util.concurrent.TimeUnit
import kotlin.math.ceil


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, OctoGameViewModelFactory>() {
    private val stateMap = HashMap<String, Boolean>()
    private var gameEndBottomSheetFragment: GameEndBottomSheet? = null
    private lateinit var gameLevelInfo: GameLevelInfo
    private lateinit var game: Game
    private var openedCard: FlipView? = null
    private var showingIncorrectCards: Boolean = false
    private var cardOpenClicksCount = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = savedInstanceState?.getSerializable(GAME_LEVEL_INFO) as? GameLevelInfo
                ?: arguments?.getSerializable(GAME_LEVEL_INFO) as GameLevelInfo

        game = savedInstanceState?.getSerializable(GAME) as? Game
                ?: arguments?.getSerializable(GAME) as Game

        viewModel.onGameLevelSelected(gameLevelInfo.levelId)

        compositeDisposable.add(viewModel.navigationStream().subscribe {
            gameEndBottomSheetFragment?.dismiss()

            @Suppress("WHEN_ENUM_CAN_BE_NULL_IN_JAVA")
            when (it) {
                FromGameEndPaths.HOME -> navController.navigate(R.id.action_global_mainFragment)
                FromGameEndPaths.NEXT -> {
                    val gameLevelInfos = game.gameLevelInfos
                    val nextLevelIndex = gameLevelInfos.indexOf(gameLevelInfo) + 1

                    if (nextLevelIndex < gameLevelInfos.size) {
                        gameLevelInfo = gameLevelInfos[nextLevelIndex]
                        viewModel.onGameLevelSelected(gameLevelInfo.levelId)
                    } else {
                        Log.d("GameLevelFragment", "BottomSheet's NEXT points out of bound")
                    }
                }
                FromGameEndPaths.BACK -> navController.navigate(R.id.action_gameLevelFragment_pop)
            }
        })
    }

    override fun onSaveInstanceState(outState: Bundle) {
        outState.putSerializable(GAME_LEVEL_INFO, gameLevelInfo)
        outState.putSerializable(GAME, game)
        super.onSaveInstanceState(outState)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        text.text = gameLevelInfo.toString()

        compositeDisposable.add(viewModel
                .cardsStream()
                .observeOn(SchedulersFacade.ui())
                .subscribe(::render, Throwable::printStackTrace))
    }

    private fun render(cardsDataResource: Resource<CardsData>) {
//        showIntro(cardsData)

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
        table.removeAllViews()
    }

    private fun renderCards(cardsData: CardsData) {
        clearState()

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

                val card = layoutInflater.inflate(R.layout.game_card, tableRow, false) as CardView

                with(card.flip_view) {
                    flip(true)

                    val word = words[cardNum]

                    tag = word
                    frontText.text = word
                    setOnClickListener(CardClickListener(cardsData))
                }

                tableRow.addView(card, j)
            }

            table.addView(tableRow, i)
        }
    }

    private fun markCardsPairOpened(word: String, openedCardWord: String) {
        stateMap[word] = true
        stateMap[openedCardWord] = true

        if (stateMap.values.all { it }) {
            viewModel.onGameEnd(game, gameLevelInfo.levelId, cardOpenClicksCount)

            showGameEndDialog()
        }
    }

    private fun showGameEndDialog() {
        gameEndBottomSheetFragment = GameEndBottomSheet().also {
            supportFragmentInjector().inject(it)
            it.show(childFragmentManager, GameEndBottomSheet::class.java.canonicalName) //TODO
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
                        compositeDisposable.add(Observable.timer(2, TimeUnit.SECONDS)
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