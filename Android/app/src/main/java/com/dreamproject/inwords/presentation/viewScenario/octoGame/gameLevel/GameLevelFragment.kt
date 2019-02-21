package com.dreamproject.inwords.presentation.viewScenario.octoGame.gameLevel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TableRow
import androidx.fragment.app.Fragment
import com.dreamproject.inwords.R
import com.dreamproject.inwords.data.dto.WordTranslation
import com.dreamproject.inwords.domain.BundleKeys
import com.dreamproject.inwords.domain.GameLevelInfo
import kotlinx.android.synthetic.main.card_front.view.*
import kotlinx.android.synthetic.main.fragment_game_level.*
import java.util.*


class GameLevelFragment : Fragment() {
    private lateinit var gameLevelInfo: GameLevelInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        gameLevelInfo = arguments?.getSerializable(BundleKeys.GAME_LEVEL_INFO) as GameLevelInfo
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_game_level, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        text.text = gameLevelInfo.toString()

        val wordTranslations: List<WordTranslation> =
                listOf(WordTranslation("car", "мошниа"),
                        WordTranslation("box", "каропка"))

        val words = prepairWordsForCards(wordTranslations)

        val rows = words.size / 2
        for (i in 0 until rows) {
            val tableRow = TableRow(context)
            tableRow.layoutParams = ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT)

            for (j in 0 until 2) {
                val card = layoutInflater.inflate(R.layout.card, tableRow, false)
                card
                card.frontText.text = words[j + i * 2]

                tableRow.addView(card, j)
            }

            table.addView(tableRow, i)
        }
    }

    private fun prepairWordsForCards(wordTranslations: List<WordTranslation>): List<String> {
        val words = ArrayList<String>(wordTranslations.size)

        for (wordTranslation in wordTranslations) {
            words.add(wordTranslation.wordForeign)
            words.add(wordTranslation.wordNative)
        }
        words.shuffle()

        return words;
    }
}
