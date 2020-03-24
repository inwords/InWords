package ru.inwords.inwords.training.data

import io.reactivex.Single
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface TrainingRepository {

    fun getWordsForTraining(): Single<List<WordTranslation>>
    fun getIdsForTraining(): Single<List<Int>>
}