package ru.inwords.inwords.presentation.custom_views

import android.content.Context
import android.graphics.Canvas
import android.graphics.Rect
import android.util.AttributeSet
import android.view.View
import androidx.core.content.res.ResourcesCompat
import ru.inwords.inwords.R
import kotlin.math.max

class ProgressView @JvmOverloads
constructor(context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0, defStyleRes: Int = 0)
    : View(context, attrs, defStyleAttr, defStyleRes) {

    private val contentRect = Rect()
    private val mProgressBar = ProgressBar(this)

    private var mColor1: Int = 0xB3000000L.toInt()
    private var mColor2: Int = 0x80000000L.toInt()
    private var mColor3: Int = 0x4d000000L.toInt()
    private var mColor4: Int = 0x1a000000L.toInt()

    var progress: Int = 0
        set(value) {
            field = value
            invalidate()
        }

    init {
        val res = context.resources

        mColor1 = ResourcesCompat.getColor(res, R.color.holo_blue_bright, context.theme)
        mColor2 = ResourcesCompat.getColor(res, R.color.holo_green_light, context.theme)
        mColor3 = ResourcesCompat.getColor(res, R.color.holo_orange_light, context.theme)
        mColor4 = ResourcesCompat.getColor(res, R.color.holo_red_light, context.theme)
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)

        contentRect.set(
                paddingLeft,
                paddingTop,
                max(width - paddingRight, 0),
                max(height - paddingBottom, 0))

        setupProgressBarBounds()
    }

    private fun drawEndlessProgress(canvas: Canvas) {
        setupProgressBarBounds()
        mProgressBar.setColorScheme(mColor1, mColor2, mColor3, mColor4)
        mProgressBar.start()

        if (progress > 0) {
            mProgressBar.draw(canvas)
        }
    }

    private fun setupProgressBarBounds() {
        mProgressBar.setBounds(contentRect.left, contentRect.top, contentRect.width(), contentRect.height())
    }

    override fun onDraw(canvas: Canvas) {
        drawEndlessProgress(canvas)

        super.onDraw(canvas)
    }
}