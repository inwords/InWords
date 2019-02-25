package com.dreamproject.inwords.domain

import androidx.annotation.ColorInt
import com.dreamproject.inwords.core.ColorUtil

object ColoringUtil {
    @ColorInt
    fun getColorForGameLevelInfo(color: String, available: Boolean): Int {
        return if (available) {
            ColorUtil.decodeColor(color)
        } else {
            ColorUtil.decodeColor(color, 0x88000000)
        }
    }
}
