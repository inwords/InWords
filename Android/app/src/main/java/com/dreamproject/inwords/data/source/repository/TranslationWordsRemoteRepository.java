package com.dreamproject.inwords.data.source.repository;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.DataManipulations;
import com.dreamproject.inwords.data.source.WebService.WebRequests;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsRemoteRepository implements DataManipulations<WordTranslation> {
    private WebRequests webRequests;

    public TranslationWordsRemoteRepository() {
        webRequests = WebRequests.INSTANCE;
    }

    @Override
    public Observable<List<WordTranslation>> get() {
        return webRequests.getAllWords()
                .filter(wordTranslations -> !wordTranslations.isEmpty())
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
}
