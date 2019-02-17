package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsDatabaseRepository implements TranslationWordsLocalRepository {
    private WordTranslationDao wordTranslationDao;

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
        return Single.defer(() -> {
            long id = wordTranslationDao.insert(wordTranslation);
            wordTranslation.getWordIdentificator().setId((int) id);

            return Single.just(wordTranslation);
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordTranslation>> addReplaceAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()){
            return Single.just(wordTranslations);
        }

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
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()){
            return Completable.complete();
        }

        return Completable.fromCallable(() -> wordTranslationDao.deleteAll(wordTranslations))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        if (serverIds.isEmpty()){
            return Completable.complete();
        }

        return Completable.fromCallable(() -> wordTranslationDao.deleteAllServerIds(serverIds))
                .subscribeOn(Schedulers.io());
    }
}
