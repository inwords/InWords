package ru.inwords.inwords.core

/**
 * Односторонний конвертер
 */
abstract class BaseOneWayConverter<From : Any, To : Any> {
    /**
     * Конвертирует [source] из типа [From] в тип [To]
     */
    abstract fun convert(source: From): To

    /**
     * Конвертирует [sourceList] из типа [From] в тип [To].
     * Если исходный `sourceList == null`, товозвращает [emptyList].
     *
     * @param sourceList исходный список
     * @return результирующий список
     */
    fun convertList(sourceList: List<From>?): List<To> {
        return sourceList?.map { from: From -> this.convert(from) } ?: emptyList()
    }
}