package ru.inwords.inwords.core.utils

import io.reactivex.functions.BiFunction

fun <L, R> toPair(): BiFunction<L, R, Pair<L, R>> {
    return BiFunction { leftInner, rightInner -> leftInner to rightInner }
}