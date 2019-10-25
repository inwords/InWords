package ru.inwords.inwords.translation.data

import ru.inwords.inwords.translation.data.bean.WordTranslation

fun serverIdsFromWordTranslations(wordTranslations: List<WordTranslation>): List<Int> =
        wordTranslations.map { it.serverId }

fun absList(integers: List<Int>): List<Int> =
        integers.map(Math::abs)
