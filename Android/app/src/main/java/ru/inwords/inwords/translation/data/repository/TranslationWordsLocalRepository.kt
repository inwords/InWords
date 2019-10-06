package ru.inwords.inwords.translation.data.repository

import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import ru.inwords.inwords.translation.data.bean.WordTranslation

//Here any methods connected with manipulating data needed for Translation
interface TranslationWordsLocalRepository {
    fun getList(): Observable<List<WordTranslation>>

    fun addReplace(wordTranslation: WordTranslation): Single<WordTranslation>

    fun addReplaceAll(wordTranslations: List<WordTranslation>): Single<List<WordTranslation>>

    fun removeAll(wordTranslations: List<WordTranslation>): Completable

    fun removeAllServerIds(serverIds: List<Int>): Completable

    fun clear()
}
