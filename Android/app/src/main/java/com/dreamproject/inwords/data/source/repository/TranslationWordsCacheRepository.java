package com.dreamproject.inwords.data.source.repository;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.DataManipulations;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsCacheRepository implements DataManipulations<WordTranslation> {
    private CopyOnWriteArrayList<WordTranslation> list;

    public TranslationWordsCacheRepository() {
        this.list = new CopyOnWriteArrayList<>();
    }

    @Override
    public Observable<List<WordTranslation>> get() {
        return Observable.fromCallable(() -> (List<WordTranslation>) list)
                .filter(wordTranslations -> !wordTranslations.isEmpty());
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return Completable.fromCallable(() -> list.add(wordTranslation));
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> list.addAllAbsent(wordTranslations))
                .subscribeOn(Schedulers.computation());
    }

    @Override
    public Completable remove(WordTranslation value) {
        return Completable.fromCallable(() -> list.remove(value))
                .subscribeOn(Schedulers.computation());
    }
}
