package ru.inwords.inwords.data.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.core.addOrPut
import ru.inwords.inwords.data.dto.game.LevelScoreRequest
import ru.inwords.inwords.domain.model.LevelResultModel

class LevelResultConverter : BaseOneWayConverter<LevelResultModel, LevelScoreRequest>() {
    override fun convert(source: LevelResultModel): LevelScoreRequest {
        val openCountConverted = mutableMapOf<Int, Int>()
        source.data.forEach {
            openCountConverted.addOrPut(it.key.wordTranslationServerId, it.value)
        }

        return LevelScoreRequest(
            source.levelId,
            openCountConverted
        )
    }
}