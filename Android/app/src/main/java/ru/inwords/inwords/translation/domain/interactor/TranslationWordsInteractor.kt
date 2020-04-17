package ru.inwords.inwords.translation.domain.interactor

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.translation.domain.model.Definition
import ru.inwords.inwords.translation.domain.model.LookupDirection
import ru.inwords.inwords.translation.domain.model.WordTranslation

interface TranslationWordsInteractor {
    fun getAllWords(): Observable<List<WordTranslation>>

    fun addReplace(wordTranslation: WordTranslation): Completable

    fun addReplaceAll(wordTranslations: List<WordTranslation>): Completable

    fun remove(wordTranslation: WordTranslation): Completable

    fun removeAll(wordTranslations: List<WordTranslation>): Completable

    fun update(oldWord: WordTranslation, newWord: WordTranslation): Completable

    fun lookup(text: String, lookupDirection: LookupDirection): Single<List<Definition>>

    fun presyncOnStart(forceUpdate: Boolean = false): Completable

    fun tryUploadUpdatesToRemote(): Completable

    fun notifyDataChanged()
    fun clearCache()
}
