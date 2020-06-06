package ru.inwords.inwords.core

abstract class BaseTwoWayConverter<From : Any, To : Any> : BaseOneWayConverter<From, To>() {
    /**
     * Конвертирует [source] из типа [To] в тип [From]
     */
    abstract fun reverse(source: To): From

    /**
     * Конвертирует [sourceList] из типа [To] в тип [From].
     * Если исходный `sourceList == null`, товозвращает [emptyList].
     *
     * @param sourceList исходный список
     * @return результирующий список
     */
    fun reverseList(sourceList: List<To>?): List<From> {
        return sourceList?.map { from: To -> this.reverse(from) } ?: emptyList()
    }
}