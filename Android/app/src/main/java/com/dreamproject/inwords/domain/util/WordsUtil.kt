package com.dreamproject.inwords.domain.util

import com.dreamproject.inwords.data.dto.EntityIdentificator

fun serverIdsFromWordTranslations(wordIdentificators: List<EntityIdentificator>): List<Int> =
        wordIdentificators.map { it.serverId }

fun absList(integers: List<Int>): List<Int> =
        integers.map(Math::abs)
