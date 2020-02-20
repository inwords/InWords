package ru.inwords.inwords.game.presentation.game_level

import android.util.TypedValue
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TableLayout
import android.widget.TableRow
import android.widget.TextView
import androidx.core.view.marginBottom
import androidx.core.view.marginEnd
import androidx.core.view.marginStart
import androidx.core.view.marginTop
import androidx.core.widget.TextViewCompat
import kotlinx.android.synthetic.main.game_card_front.view.*
import ru.inwords.flipview.FlipView
import ru.inwords.inwords.R
import ru.inwords.inwords.game.domain.CardsData
import ru.inwords.inwords.game.domain.model.WordModel
import java.lang.ref.WeakReference
import kotlin.math.ceil

class GameScene(private val container: WeakReference<TableLayout>) {
    private val flipViews = mutableListOf<WeakReference<FlipView>>()

    private var cardClickConsumer: ((ClickEvent) -> Unit)? = null

    var cardsData: CardsData? = null
        private set

    fun setOnClickListener(listener: (ClickEvent) -> Unit) {
        cardClickConsumer = listener
    }

    fun setState(flipState: GameLevelOrchestrator.FlipState) {
        flipViews.forEachIndexed { i, flipViewRef ->
            flipViewRef.get()?.flip(!flipState.get(i))
        }
    }

    fun clearState() {
        container.get()?.removeAllViews()
        flipViews.clear()
    }

    fun renderCards(cardsData: CardsData, flipState: GameLevelOrchestrator.FlipState) {
        clearState()

        this.cardsData = cardsData

        val table = container.get() ?: return
        val context = table.context

        val layoutInflater = LayoutInflater.from(context)

        val words = cardsData.words

        val cols = when (words.size) {
            in 4..6 -> 2
            else -> 3
        }
        val rows = ceil(words.size / cols.toFloat()).toInt()

        val cardSizePx = if (table.measuredHeight < table.measuredWidth) {
            table.measuredHeight / rows
        } else {
            table.measuredWidth / cols
        }

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
                flipView.layoutParams = flipView.layoutParams.apply {
                    height = cardSizePx - (flipView.marginTop + flipView.marginBottom)
                    width = cardSizePx - (flipView.marginStart + flipView.marginEnd)
                }

                TextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(
                    flipView.frontLayout as TextView,
                    12, //TODO remove hardcode
                    24,
                    1,
                    TypedValue.COMPLEX_UNIT_SP
                )

                with(flipView) {
                    flipViews.add(WeakReference(this))

                    frontText.text = words[cardNum].word
                    setOnClickListener(InternalClickListener(cardsData, flipViews.lastIndex))
                }

                tableRow.addView(flipView, j)
            }

            table.addView(tableRow, i)
        }

        setState(flipState)
    }

    fun postDelayed(delayMillis: Long, action: () -> Unit): Boolean {
        return container.get()?.postDelayed(action, delayMillis) ?: false
    }

    private fun toSeqIndex(i: Int, j: Int, rows: Int) = i * rows + j

    data class ClickEvent(val index: Int, val word: WordModel)

    private inner class InternalClickListener(
        private val cardsData: CardsData,
        private val index: Int
    ) : View.OnClickListener {
        override fun onClick(v: View?) {
            if (v is FlipView && v.isFlipped) {
                cardClickConsumer?.invoke(ClickEvent(index, cardsData.words[index]))
            }
        }
    }
}