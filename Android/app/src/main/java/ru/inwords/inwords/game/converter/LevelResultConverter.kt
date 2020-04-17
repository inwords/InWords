package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.core.utils.addOrPut
import ru.inwords.inwords.game.data.bean.LevelScoreRequest
import ru.inwords.inwords.game.domain.model.LevelResultModel

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