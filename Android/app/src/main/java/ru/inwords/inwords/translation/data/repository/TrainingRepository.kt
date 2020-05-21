package ru.inwords.inwords.translation.data.repository

import io.reactivex.Observable
import ru.inwords.inwords.core.resource.Resource
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface TrainingRepository {
    fun getActualWordsForTraining(forceUpdate: Boolean = false): Observable<Resource<List<WordTranslation>>>
    fun clearCache()
}