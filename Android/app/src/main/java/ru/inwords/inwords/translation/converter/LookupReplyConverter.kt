package ru.inwords.inwords.translation.converter

import ru.inwords.inwords.core.BaseOneWayConverter
import ru.inwords.inwords.proto.dictionary.LookupReply
import ru.inwords.inwords.translation.domain.model.*

class LookupReplyConverter : BaseOneWayConverter<LookupReply, List<Definition>>() {
    override fun convert(source: LookupReply): List<Definition> {
        return source.defList.map { def ->
            val translations = def.trList.map { tr ->
                val synonyms = tr.synList.map { syn ->
                    Synonym(
                        text = syn.text,
                        partOfSpeech = syn.pos,
                        gender = syn.gen,
                        aspect = syn.asp
                    )
                }

                val means = tr.meanList.map { mean -> Word(mean.text) }

                val examples = tr.exList.map { ex ->
                    val trs = ex.trList.map { tr -> Word(tr.text) }
                    Example(
                        text = ex.text,
                        translations = trs
                    )
                }

                Translation(
                    text = tr.text,
                    number = tr.num,
                    partOfSpeech = tr.pos,
                    gender = tr.gen,
                    synonyms = synonyms,
                    means = means,
                    examples = examples,
                    aspect = tr.asp,
                    animate = null
                )
            }

            Definition(
                text = def.text,
                partOfSpeech = def.pos,
                transcription = def.ts,
                translations = translations
            )
        }
    }
}