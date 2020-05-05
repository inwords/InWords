package ru.inwords.inwords.game.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.core.utils.addOrPut
import ru.inwords.inwords.game.data.entity.LevelMetricEntity
import ru.inwords.inwords.game.domain.model.LevelMetric

class LevelMetricConverter : BaseOneWayConverter<LevelMetric, LevelMetricEntity>() {
    override fun convert(source: LevelMetric): LevelMetricEntity {
        val openCountConverted = mutableMapOf<Int, Int>()
        source.data.forEach {
            openCountConverted.addOrPut(it.key.wordTranslationServerId, it.value)
        }

        return LevelMetricEntity(
            source.levelId,
            openCountConverted
        )
    }
}