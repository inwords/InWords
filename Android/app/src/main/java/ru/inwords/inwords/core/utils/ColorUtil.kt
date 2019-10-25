package ru.inwords.inwords.core.utils

object ColorUtil {
    @JvmOverloads
    fun decodeColor(color: String, opacity: Long = 0xFF000000) = (Integer.decode(color) + opacity)
            .toInt()
}
