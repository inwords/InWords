package ru.inwords.inwords.training.domain

import android.util.Log
import ru.inwords.inwords.training.data.TrainingRepository
import ru.inwords.inwords.translation.domain.interactor.TranslationWordsInteractor
import ru.inwords.inwords.translation.domain.model.WordTranslation

class TrainingInteractor(private val translationWordsInteractor: TranslationWordsInteractor,
                         private val trainingRepository: TrainingRepository) {

    fun getActualWordsForTraining(): List<WordTranslation> {
        val words = translationWordsInteractor.getAllWords().blockingFirst(emptyList())

        val idsForTraining = trainingRepository.getIdsForTraining().blockingGet().toSet()

        val wordsForTrainingFiltered = words.filter { it.serverId in idsForTraining }

        return if (wordsForTrainingFiltered.size != idsForTraining.size) {
            Log.w(javaClass.simpleName, "wordsForTraining.size != idsForTraining")

            trainingRepository.getWordsForTraining().blockingGet()
        } else {
            wordsForTrainingFiltered
        }
    }
}