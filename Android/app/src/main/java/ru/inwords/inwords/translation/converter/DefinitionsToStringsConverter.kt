package ru.inwords.inwords.translation.converter

import ru.inwords.inwords.core.BaseResourceOneWayConverter
import ru.inwords.inwords.translation.domain.model.Definition

class DefinitionsToStringsConverter : BaseResourceOneWayConverter<List<Definition>, List<String>>() {
    override fun convert(source: List<Definition>): List<String> {
        val result = arrayListOf<String>()

        source.forEach { definition ->
            definition.translations.forEach {
                result.add(it.text)
            }
        }

        return result
    }
}