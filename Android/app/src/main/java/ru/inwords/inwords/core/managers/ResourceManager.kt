package ru.inwords.inwords.core.managers


import android.content.Context
import androidx.annotation.*
import androidx.core.content.ContextCompat
import java.io.InputStream

/**
 * Менеджер для получения ресурсов через [context]
 */
class ResourceManager(private val context: Context) {

    /**
     * Возвращает строку по идентификатору ресурса [resId]
     */
    fun getString(@StringRes resId: Int): String {
        return context.getString(resId)
    }

    /**
     * Возвращает строку по идентификатору ресурса [resId] с аргументами форматирования [formatArgs]
     */
    fun getString(@StringRes resId: Int, vararg formatArgs: Any): String {
        return context.resources.getString(resId, *formatArgs)
    }

    /**
     * Возвращает размер по [resId]
     */
    fun getDimension(@DimenRes resId: Int): Float {
        return context.resources.getDimension(resId)
    }

    /**
     * Возвращает цвет по [resId]
     */
    fun getColorRes(@ColorRes resId: Int): Int {
        return ContextCompat.getColor(context, resId)
    }

    /**
     * Возвращает строку по [resId] и количеству [quantity] с аргументами форматирования [formatArgs]
     */
    fun getQuantityString(@PluralsRes resId: Int, quantity: Int, vararg formatArgs: Any): String {
        return context.resources.getQuantityString(resId, quantity, *formatArgs)
    }

    /**
     * Возвращает [InputStream] raw ресурса по [resId]

     * @see android.content.res.Resources.openRawResource
     */
    fun getRawRes(@RawRes resId: Int): InputStream {
        return context.resources.openRawResource(resId)
    }

    /**
     * Возвращает строку по [resId] и количеству [quantity]
     */
    fun getPluralString(@PluralsRes resId: Int, quantity: Int): String {
        return context.resources.getQuantityString(resId, quantity)
    }

    /**
     * Возвращает массив строк по [resId]
     */
    fun getStringArray(@ArrayRes resId: Int): Array<String> {
        return context.resources.getStringArray(resId)
    }

}
