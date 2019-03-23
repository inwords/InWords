package com.dreamproject.inwords.domain.util

import android.content.Context
import androidx.core.content.ContextCompat.getColor
import com.dreamproject.inwords.R
import javax.inject.Inject

class ColoringUtil @Inject constructor(context: Context) {
    private val gameLevelInfoAvailableColor: Int = getColor(context, R.color.colorPrimary)
    private val gameLevelInfoUnavailableColor: Int = getColor(context, R.color.colorPrimaryTransparent)

    fun getColorForGameLevelInfo(available: Boolean): Int =
            if (available) {
                gameLevelInfoAvailableColor
            } else {
                gameLevelInfoUnavailableColor
            }
}

