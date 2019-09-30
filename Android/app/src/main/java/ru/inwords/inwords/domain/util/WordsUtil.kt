package ru.inwords.inwords.domain.util

import ru.inwords.inwords.data.dto.WordTranslation

fun serverIdsFromWordTranslations(wordTranslations: List<WordTranslation>): List<Int> =
        wordTranslations.map { it.serverId }

fun absList(integers: List<Int>): List<Int> =
        integers.map(Math::abs)
