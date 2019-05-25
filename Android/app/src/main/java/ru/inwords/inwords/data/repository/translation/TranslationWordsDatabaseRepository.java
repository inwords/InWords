package ru.inwords.inwords.data.repository.translation;

import android.annotation.SuppressLint;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.source.database.WordTranslationDao;

public class TranslationWordsDatabaseRepository implements TranslationWordsLocalRepository {
    private final WordTranslationDao wordTranslationDao;

    @Inject
    public TranslationWordsDatabaseRepository(WordTranslationDao wordTranslationDao) {
        this.wordTranslationDao = wordTranslationDao;
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return null;
    } //TODO

    @Override
    public Observable<WordTranslation> getByOne() {
        return getList()
                .flatMap(Observable::fromIterable);
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return wordTranslationDao.getAllWords()
                .subscribeOn(Schedulers.io())
                /*.map(wordTranslations -> {
                    if (wordTranslations.isEmpty()) { //TODO::
                        return Arrays.asList(new WordTranslation(15, 0, "HEllo1", "из DBRepos"),
                                new WordTranslation(16, 0, "Hellooo2", "из DBRepos"));
                    }

                    return wordTranslations;
                })*/
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    @Override
    public Single<WordTranslation> addReplace(WordTranslation wordTranslation) {
        return wordTranslationDao.insert(wordTranslation).map(id -> {
            wordTranslation.getWordIdentificator().setId(id);

            return wordTranslation;
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordTranslation>> addReplaceAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()) {
            return Single.just(wordTranslations);
        }

        return Single.defer(() -> wordTranslationDao.insertAll(wordTranslations)
                .flatMapObservable(Observable::fromIterable)
                .zipWith(Observable.fromIterable(wordTranslations),
                        (id, wordTranslation) -> {
                            wordTranslation.setId(id);

                            return wordTranslation;
                        })
                .toList())
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()) {
            return Completable.complete();
        }

        return wordTranslationDao.deleteAll(wordTranslations)
                .ignoreElement()
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        if (serverIds.isEmpty()) {
            return Completable.complete();
        }

        return wordTranslationDao.deleteAllServerIds(serverIds)
                .ignoreElement()
                .subscribeOn(Schedulers.io());
    }

    @SuppressLint("CheckResult")
    @Override
    public void clear() {
        wordTranslationDao.deleteAll().blockingGet();
    }
}
