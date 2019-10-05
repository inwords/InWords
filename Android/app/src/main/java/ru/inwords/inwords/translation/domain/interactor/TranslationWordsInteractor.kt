package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import ru.inwords.inwords.translation.data.bean.WordTranslation

interface TranslationWordsInteractor {
    fun getAllWords(): Observable<List<WordTranslation>>

    fun addReplace(wordTranslation: WordTranslation): Completable

    fun addReplaceAll(wordTranslations: List<WordTranslation>): Completable

    fun remove(wordTranslation: WordTranslation): Completable

    fun removeAll(wordTranslations: List<WordTranslation>): Completable

    fun update(oldWord: WordTranslation, newWord: WordTranslation): Completable

    fun clearCache()
}
