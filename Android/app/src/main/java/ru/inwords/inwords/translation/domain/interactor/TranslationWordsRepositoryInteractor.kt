package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.translation.data.bean.WordTranslation

interface TranslationWordsRepositoryInteractor {
    fun getList(): Observable<List<WordTranslation>>

    fun add(wordTranslation: WordTranslation): Completable

    fun addAll(wordTranslations: List<WordTranslation>): Completable

    fun markRemoved(wordTranslation: WordTranslation): Completable

    fun markRemovedAll(wordTranslations: List<WordTranslation>): Completable

    fun clearCache()
}
