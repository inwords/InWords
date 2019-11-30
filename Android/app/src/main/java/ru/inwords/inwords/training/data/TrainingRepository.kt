package ru.inwords.inwords.training.data

import io.reactivex.Single
import ru.inwords.inwords.translation.data.bean.WordTranslation

interface TrainingRepository {

    fun getWordsForTraining(): Single<List<WordTranslation>>
    fun getIdsForTraining(): Single<List<Int>>
}