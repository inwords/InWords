package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.WebRequests;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

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
    public Completable add(WordTranslation wordTranslation) {
        return Completable.fromCallable(() -> webRequests.insertWord(wordTranslation));
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> webRequests.insertAllWords(wordTranslations));
    }

    @Override
    public Completable remove(WordTranslation value) {
        return null;
    }

    @Override
    public Completable removeAll(List<WordTranslation> values) {
        return null;
    }
}
