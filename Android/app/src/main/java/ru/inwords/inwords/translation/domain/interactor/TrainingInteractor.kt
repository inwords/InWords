package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Single
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.translation.data.repository.TrainingRepository
import ru.inwords.inwords.translation.domain.model.WordTranslation

class TrainingInteractor(private val trainingRepository: TrainingRepository) {
    fun getActualWordsForTraining(forceUpdate: Boolean = false): Single<List<WordTranslation>> {
        return trainingRepository.getActualWordsForTraining(forceUpdate)
            .map { (it as? Resource.Success)?.data ?: emptyList() }
            .firstOrError()
    }

    fun clearCache() = trainingRepository.clearCache()
}