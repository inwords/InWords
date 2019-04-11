package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TableRow
import androidx.cardview.widget.CardView
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import eu.davidea.flipview.FlipView
import io.reactivex.Observable
import kotlinx.android.synthetic.main.fragment_game_level.*
import kotlinx.android.synthetic.main.game_card.view.*
import kotlinx.android.synthetic.main.game_card_front.view.*
import java.util.concurrent.TimeUnit
import kotlin.math.ceil


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, GameLevelViewModelFactory>() {
    private val stateMap = HashMap<String, Boolean>()
    private var gameEndBottomSheetFragment: GameEndBottomSheet? = null
    private lateinit var gameLevelInfo: GameLevelInfo
    private var openedCard: FlipView? = null
    private var showing: Boolean = false
    private var cardOpenClicksCount = 0

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        gameLevelInfo = arguments?.getSerializable(GAME_LEVEL_INFO) as GameLevelInfo

        viewModel.onGameLevelSelected(gameLevelInfo.levelId)

        compositeDisposable.add(viewModel.navigationStream().subscribe {
            gameEndBottomSheetFragment?.dismiss()

            @Suppress("WHEN_ENUM_CAN_BE_NULL_IN_JAVA")
            when (it) {
                FromGameEndPaths.HOME -> navController.navigate(R.id.action_global_mainFragment)
                FromGameEndPaths.NEXT -> 1
                FromGameEndPaths.BACK -> navController.navigate(R.id.action_gameLevelFragment_pop)
            }
        })
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        text.text = gameLevelInfo.toString()

        compositeDisposable.add(viewModel
                .cardsStream()
                .observeOn(SchedulersFacade.ui())
                .subscribe(::render, Throwable::printStackTrace))
    }

    private fun render(cardsData: CardsData) {
//        showIntro(cardsData)

        cardsData.words.forEach { stateMap[it] = false }

        renderCards(cardsData)
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
            viewModel.onGameEnd(cardOpenClicksCount)

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
            if (v is FlipView && v.isFlipped && !showing) {
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
                        showing = true
                        Observable.timer(2, TimeUnit.SECONDS)
                                .observeOn(SchedulersFacade.ui())
                                .subscribe {
                                    v.flip(true)
                                    openedCard?.flip(true)
                                    openedCard = null
                                    showing = false
                                }
                    }
                }
            }
        }
    }

    override fun getLayout() = R.layout.fragment_game_level

    override fun getClassType() = GameLevelViewModel::class.java
}