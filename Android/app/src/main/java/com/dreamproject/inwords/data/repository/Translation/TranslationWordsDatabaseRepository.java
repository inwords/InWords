package com.dreamproject.inwords.data.repository.Translation;

import android.content.Context;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;

import java.util.Arrays;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsDatabaseRepository implements TranslationWordsLocalRepository {
    private WordTranslationDao wordTranslationDao;

    public TranslationWordsDatabaseRepository(Context context) {
        AppRoomDatabase db = AppRoomDatabase.getDatabase(context);
        wordTranslationDao = db.wordTranslationDao();
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return null;
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return getList()
                .flatMap(Observable::fromIterable);
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return wordTranslationDao.getAllWords()
                .subscribeOn(Schedulers.io())
                .map(wordTranslations -> {
                    if (wordTranslations.isEmpty()) { //TODO::
                        return Arrays.asList(new WordTranslation(15, 0, "HEllo1", "из DBRepos"),
                                new WordTranslation(16, 0, "Hellooo2", "из DBRepos"));
                    }

                    return wordTranslations;
                })
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    @Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            long id = wordTranslationDao.insert(wordTranslation);
            wordTranslation.getWordIdentificator().setId((int) id);

            return Single.just(wordTranslation);
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations) {
        return Single.defer(() -> Observable.zip(
                Observable.fromIterable(wordTranslationDao.insertAll(wordTranslations)),
                Observable.fromIterable(wordTranslations),
                (id, wordTranslation) -> {
                    wordTranslation.setId(id.intValue());

                    return wordTranslation;
                })
                .toList())
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable remove(WordTranslation wordTranslation) { //TODO
        return Completable.fromCallable(() -> wordTranslationDao.delete(wordTranslation))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) { //TODO
        return Completable.fromCallable(() -> wordTranslationDao.deleteAll(wordTranslations))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Completable.fromCallable(() -> wordTranslationDao.deleteAllServerIds(serverIds))
                .subscribeOn(Schedulers.io());
    }
}
