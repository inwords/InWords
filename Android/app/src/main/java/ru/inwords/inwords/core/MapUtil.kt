package ru.inwords.inwords.core

fun <K> MutableMap<K, Int>.addOrPut(key: K, value: Int): Int {
    val newValue = get(key)?.plus(value) ?: value
    put(key, newValue)
    return newValue
}