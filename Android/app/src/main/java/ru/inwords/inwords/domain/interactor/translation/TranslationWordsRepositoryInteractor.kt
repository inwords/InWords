package ru.inwords.inwords.domain.interactor.translation

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.data.dto.WordTranslation

interface TranslationWordsRepositoryInteractor {
    fun getByOne(): Observable<WordTranslation>

    fun getList(): Observable<List<WordTranslation>>

    fun add(wordTranslation: WordTranslation): Completable

    fun addAll(wordTranslations: List<WordTranslation>): Completable

    fun markRemoved(wordTranslation: WordTranslation): Completable

    fun markRemovedAll(wordTranslations: List<WordTranslation>): Completable

    fun clearCache()
}
