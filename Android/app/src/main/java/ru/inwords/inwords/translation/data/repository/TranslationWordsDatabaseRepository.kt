package ru.inwords.inwords.translation.data.repository

import android.annotation.SuppressLint
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.translation.data.bean.WordTranslation
import ru.inwords.inwords.translation.data.source.WordTranslationDao
import javax.inject.Inject

class TranslationWordsDatabaseRepository @Inject
constructor(private val wordTranslationDao: WordTranslationDao) : TranslationWordsLocalRepository {
    override fun getList(): Observable<List<WordTranslation>> {
        return wordTranslationDao.getAllWords()
                .subscribeOn(Schedulers.io())
    }

    override fun addReplace(wordTranslation: WordTranslation): Single<WordTranslation> {
        return wordTranslationDao.insert(wordTranslation).map { id ->
            wordTranslation.copy(id = id)
        }
                .subscribeOn(Schedulers.io())
    }

    override fun addReplaceAll(wordTranslations: List<WordTranslation>): Single<List<WordTranslation>> {
        return if (wordTranslations.isEmpty()) {
            Single.just(wordTranslations)
        } else
            wordTranslationDao.insertAll(wordTranslations)
                    .flatMapObservable { Observable.fromIterable(it) }
                    .zipWith(Observable.fromIterable(wordTranslations),
                            BiFunction<Long, WordTranslation, WordTranslation> { id, wordTranslation ->
                                wordTranslation.copy(id = id)
                            })
                    .toList()
                    .subscribeOn(Schedulers.io())

    }

    override fun removeAll(wordTranslations: List<WordTranslation>): Completable {
        return if (wordTranslations.isEmpty()) {
            Completable.complete()
        } else {
            wordTranslationDao.deleteAll(wordTranslations)
                    .ignoreElement()
                    .subscribeOn(Schedulers.io())
        }
    }

    override fun removeAllServerIds(serverIds: List<Int>): Completable {
        return if (serverIds.isEmpty()) {
            Completable.complete()
        } else {
            wordTranslationDao.deleteAllServerIds(serverIds)
                    .ignoreElement()
                    .subscribeOn(Schedulers.io())
        }
    }

    @SuppressLint("CheckResult")
    override fun clear() {
        wordTranslationDao.deleteAll().blockingGet()
    }
}
