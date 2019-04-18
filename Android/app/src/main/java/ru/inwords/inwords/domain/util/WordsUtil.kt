package ru.inwords.inwords.domain.util

import ru.inwords.inwords.data.dto.EntityIdentificator

fun serverIdsFromWordTranslations(wordIdentificators: List<EntityIdentificator>): List<Int> =
        wordIdentificators.map { it.serverId }

fun absList(integers: List<Int>): List<Int> =
        integers.map(Math::abs)
