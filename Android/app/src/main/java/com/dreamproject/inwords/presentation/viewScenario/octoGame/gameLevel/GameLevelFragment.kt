package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.content.Context
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.TableRow
import com.dreamproject.inwords.R
import com.dreamproject.inwords.core.util.SchedulersFacade
import com.dreamproject.inwords.data.dto.game.GameLevelInfo
import com.dreamproject.inwords.domain.CardsData
import com.dreamproject.inwords.domain.GAME_LEVEL_INFO
import com.dreamproject.inwords.presentation.viewScenario.FragmentWithViewModelAndNav
import eu.davidea.flipview.FlipView
import io.reactivex.Observable
import io.reactivex.disposables.CompositeDisposable
import kotlinx.android.synthetic.main.card_front.view.*
import kotlinx.android.synthetic.main.fragment_game_level.*
import java.util.concurrent.TimeUnit


class GameLevelFragment : FragmentWithViewModelAndNav<GameLevelViewModel, GameLevelViewModelFactory>() {
    private val compositeDisposable = CompositeDisposable()

    private lateinit var gameLevelInfo: GameLevelInfo
    private var openedCard: FlipView? = null
    private var showing: Boolean = false

    override fun onAttach(context: Context?) {
        super.onAttach(context)

        gameLevelInfo = arguments?.getSerializable(GAME_LEVEL_INFO) as GameLevelInfo

        viewModel.onGameLevelSelected(gameLevelInfo.levelId)
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
        val words = cardsData.words

        val rows = words.size / 2
        for (i in 0 until rows) {
            val tableRow = TableRow(context)
            tableRow.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT)
            tableRow.gravity = Gravity.CENTER

            for (j in 0 until 2) {
                val card = layoutInflater.inflate(R.layout.card, tableRow, false) as FlipView

                card.apply {
                    flip(true)

                    val word = words[j + i * 2]

                    tag = word
                    frontText.text = word
                    setOnClickListener(CardClickListener(cardsData))
                }

                tableRow.addView(card, j)
            }

            table.addView(tableRow, i)
        }
    }

    private inner class CardClickListener(private val cardsData: CardsData) : View.OnClickListener {
        override fun onClick(v: View?) {
            if (v is FlipView && v.isFlipped && !showing) {
                v.flip(false)

                val word = v.tag as String

                when {
                    openedCard == null -> openedCard = v //first card opened
                    word == cardsData.getCorrespondingWord(openedCard?.tag as String) -> openedCard = null //second correct card opened
                    else -> { //second incorrect card opened
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