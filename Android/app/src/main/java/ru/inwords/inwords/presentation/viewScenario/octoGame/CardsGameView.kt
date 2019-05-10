package ru.inwords.inwords.presentation.viewScenario.octoGame

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.RectF
import android.util.AttributeSet
import android.view.View
import androidx.core.content.res.ResourcesCompat
import ru.inwords.inwords.R
import ru.inwords.inwords.domain.CardsData
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min

class CardsGameView @JvmOverloads
constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0, defStyleRes: Int = 0)
    : View(context, attrs, defStyleAttr, defStyleRes) {

    private val textPaint: Paint
    private val cardFrontPaint: Paint
    private val cardRearPaint: Paint
    private val rowTextBounds = Rect()
    private val contentRect = Rect()
    private val referenceCardRect = RectF()
    private val cardRect = RectF()
    private val cardBorderRound: Float
    private val textPadding: Float
    private val cardsMargin: Float
    private val longestWordDefault: String

    private var rowsCount = 0
    private var columnsCount = 0
    private var cardSize: Float = 0f
    private var longestWord: String = ""
    var cardsData: CardsData? = null
        set(value) {
            field = value
            calculateGridDimensions(width, height)
            declareLongestWord(value?.words)
            invalidate()
        }

    init {
        val textColor = ResourcesCompat.getColor(resources, R.color.colorPrimaryInverse, context.theme)
        val cardFrontColor = ResourcesCompat.getColor(resources, R.color.colorPrimary, context.theme)
        val cardRearColor = ResourcesCompat.getColor(resources, R.color.colorPrimaryDark, context.theme)

        textPaint = Paint(Paint.ANTI_ALIAS_FLAG)
        textPaint.color = textColor
        textPaint.textAlign = Paint.Align.CENTER

        cardFrontPaint = Paint(Paint.ANTI_ALIAS_FLAG)
        cardFrontPaint.style = Paint.Style.FILL
        cardFrontPaint.color = cardFrontColor

        cardRearPaint = Paint(Paint.ANTI_ALIAS_FLAG)
        cardRearPaint.style = Paint.Style.FILL
        cardRearPaint.color = cardRearColor

        val attr = context.theme.obtainStyledAttributes(
                attrs,
                R.styleable.CardsGameView,
                defStyleAttr, defStyleRes)

        try {
            cardBorderRound = attr.getDimension(R.styleable.CardsGameView_card_border_round, 16f)
            textPadding = attr.getDimension(R.styleable.CardsGameView_text_padding, 16f)
            cardsMargin = attr.getDimension(R.styleable.CardsGameView_cards_margin, 16f)
            longestWordDefault = attr.getString(R.styleable.CardsGameView_longest_word_default)
                    ?: "Довольно"
        } finally {
            attr.recycle()
        }

        longestWord = longestWordDefault
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)

        contentRect.set(
                paddingLeft,
                paddingTop,
                max(width - paddingRight, 0),
                max(height - paddingBottom, 0))

        val width = contentRect.width()
        val height = contentRect.height()

        cardSize = max((min(width, height) - 2 * cardsMargin) / 3f, 0f)

        measureCards(referenceCardRect)
    }

    private fun calculateGridDimensions(height: Int, width: Int) {
        val cardsData = cardsData ?: return

        columnsCount = when (cardsData.words.size) {
            in 4..6 -> 2
            else -> 3
        }

        rowsCount = ceil(cardsData.words.size / columnsCount.toFloat()).toInt()

        if (width > height) { //TODO
            val temp = columnsCount
            columnsCount = rowsCount
            rowsCount = temp
        }
    }

    override fun onDraw(canvas: Canvas) {
        val cardsData = cardsData ?: return

        if (contentRect.right == 0 || contentRect.bottom == 0) {
            return
        }

        canvas.clipRect(contentRect)

        setTextSizeForWidth(rowTextBounds, textPaint, cardSize - 2 * textPadding, longestWord) //TODO to onmeasure maybe

        drawCards(canvas, cardsData.words)
    }

    private fun measureCards(cardRect: RectF) {
        if (cardSize == 0f) {
            return
        }

        val widthNeeded = columnsCount * cardSize + (columnsCount - 1) * cardsMargin
        val heightNeeded = rowsCount * cardSize + (rowsCount - 1) * cardsMargin

        val cardsLeft = getDrawX((contentRect.width() - widthNeeded) / 2f)
        val cardsTop = getDrawY((contentRect.height() - heightNeeded) / 2f)
        cardRect.left = cardsLeft
        cardRect.top = cardsTop
        cardRect.right = cardsLeft + cardSize
        cardRect.bottom = cardsTop + cardSize
    }

    private fun drawCards(canvas: Canvas, words: List<String>) {
        val halfTextBoundHeight = rowTextBounds.height() / 2f
        val halfCardSize = (cardSize / 2 + 0.5f).toInt()

        cardRect.set(referenceCardRect)

        val cardsLeft = referenceCardRect.left

        for (i in 0 until rowsCount) {
            for (j in 0 until columnsCount) {
                val cardNum = j + i * columnsCount
                if (cardNum >= words.size) {
                    break
                }
                val word = words[cardNum]

                canvas.drawRoundRect(cardRect, cardBorderRound, cardBorderRound, cardFrontPaint)

                val centerHorizontal = cardRect.left + halfCardSize
                val baseline = cardRect.top + halfCardSize + halfTextBoundHeight
                canvas.drawText(word, centerHorizontal, baseline, textPaint)

                cardRect.offset(cardSize + cardsMargin, 0f)
            }

            cardRect.offset(0f, cardSize + cardsMargin)
            cardRect.offsetTo(cardsLeft, cardRect.top)
        }
    }

    private fun getDrawX(x: Float): Float {
        return contentRect.left + x
    }

    private fun getDrawY(y: Float): Float {
        return contentRect.top + y
    }

    private fun declareLongestWord(words: List<String>?) {
        longestWord = longestWordDefault

        words ?: return

        for (word in words) {
            if (word.length > longestWord.length) {
                longestWord = word
            }
        }
    }

    private fun setTextSizeForWidth(bounds: Rect, paint: Paint, desiredWidth: Float, text: String) {
        // Pick a reasonably large value for the test. Larger values produce
        // more accurate results, but may cause problems with hardware
        // acceleration. But there are workarounds for that, too; refer to
        // http://stackoverflow.com/questions/6253528/font-size-too-large-to-fit-in-cache
        val testTextSize = 48f

        // Get the bounds of the text, using our testTextSize.
        paint.textSize = testTextSize
        val width = paint.measureText(text)

        // Calculate the desired size as a proportion of our testTextSize.
        val desiredTextSize = testTextSize * desiredWidth / width

        // Set the placePaint for that size.
        paint.textSize = desiredTextSize
        paint.getTextBounds(text, 0, text.length, bounds)
    }
}