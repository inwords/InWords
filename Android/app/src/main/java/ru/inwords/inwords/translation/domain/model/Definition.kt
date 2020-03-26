package ru.inwords.inwords.translation.domain.model

data class Definition(
    val text: String,
    val partOfSpeech: String,
    val transcription: String,
    val translations: List<Translation>
)

data class Translation(
    val text: String, //перевод (разные языки), синоним (одинаковые языки)
    val number: String, //множественное/единственное
    val partOfSpeech: String, //часть речи
    val gender: String, //род слова
    val synonyms: List<Synonym>, //ещё варианты перевода (как text)
    val means: List<Word>, //похожие слова на том языке, С которого перервод
    val examples: List<Example>, //примеры с их переводом
    val aspect: String, //совершенная/несовершенная форма
    val animate: String? //Одушевлённое/неодушевлённое
)

data class Word(
    val text: String
)

data class Example(
    val text: String,
    val translations: List<Word>
)

data class Synonym(
    val text: String,
    val partOfSpeech: String,
    val gender: String,
    val aspect: String //совершенная/несовершенная форма
)