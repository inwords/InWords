package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.WebRequests;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsRemoteRepository implements TranslationWordsRepository {
    private WebRequests webRequests;

    public TranslationWordsRemoteRepository() {
        webRequests = WebRequests.INSTANCE;
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
        return webRequests.getAllWords()
               // .filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    @Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return webRequests.insertWord(wordTranslation);
    }

    @Override
    public Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations) {
        return webRequests.insertAllWords(wordTranslations);
    }

    @Override
    public Single<WordIdentificator> remove(WordTranslation value) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Single.just(value.getWordIdentificator()); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordIdentificator>> removeAll(List<WordTranslation> values) {
        return Single.defer(() -> {
            Thread.sleep(2000);

            return Observable.fromIterable(values) //TODO
                    .map(WordTranslation::getWordIdentificator)
                    .toList();
        })
                .subscribeOn(Schedulers.io());
    }
}
