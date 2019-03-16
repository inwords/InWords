package com.dreamproject.inwords.domain.util

import androidx.annotation.ColorInt
import com.dreamproject.inwords.core.ColorUtil

@ColorInt
fun getColorForGameLevelInfo(color: String, available: Boolean): Int =
        if (available) {
            ColorUtil.decodeColor(color)
        } else {
            ColorUtil.decodeColor(color, 0x88000000)
        }

