package ru.inwords.inwords.data.repository.translation

import android.annotation.SuppressLint
import io.reactivex.Completable
import io.reactivex.Observable
import io.reactivex.Single
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import ru.inwords.inwords.data.dto.WordTranslation
import ru.inwords.inwords.data.source.database.WordTranslationDao
import javax.inject.Inject

class TranslationWordsDatabaseRepository @Inject
constructor(private val wordTranslationDao: WordTranslationDao) : TranslationWordsLocalRepository {
    override fun getByOne(): Observable<WordTranslation> {
        return getList()
                .flatMap { Observable.fromIterable(it) }
    }

    override fun getList(): Observable<List<WordTranslation>> {
        return wordTranslationDao.allWords
                .subscribeOn(Schedulers.io())
                /*.map(wordTranslations -> {
                    if (wordTranslations.isEmpty()) { //TODO::
                        return Arrays.asList(new WordTranslation(15, 0, "HEllo1", "из DBRepos"),
                                new WordTranslation(16, 0, "Hellooo2", "из DBRepos"));
                    }

                    return wordTranslations;
                })*/
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable()
    }

    override fun addReplace(wordTranslation: WordTranslation): Single<WordTranslation> {
        return wordTranslationDao.insert(wordTranslation).map { id ->
            wordTranslation.wordIdentificator.id = id

            wordTranslation
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
                                wordTranslation.id = id

                                wordTranslation
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
