package ru.inwords.inwords.translation.domain.interactor

import android.util.Log
import ru.inwords.inwords.translation.data.repository.TranslationWordsRemoteRepository
import ru.inwords.inwords.translation.domain.model.WordTranslation

class TrainingInteractor(
    private val translationWordsInteractor: TranslationWordsInteractor,
    private val translationWordsRemoteRepository: TranslationWordsRemoteRepository
) {

    fun getActualWordsForTraining(): List<WordTranslation> {
        val words = translationWordsInteractor.getAllWords().blockingFirst(emptyList())

        val idsForTraining = translationWordsRemoteRepository.trainingIds().blockingGet().toSet()

        val wordsForTrainingFiltered = words.filter { it.serverId in idsForTraining }

        return if (wordsForTrainingFiltered.size != idsForTraining.size) {
            Log.w(javaClass.simpleName, "wordsForTraining.size != idsForTraining")

            translationWordsRemoteRepository.trainingWords().blockingGet()
        } else {
            wordsForTrainingFiltered
        }
    }
}