package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsCacheRepository implements TranslationWordsRepository {
    private CopyOnWriteArrayList<WordTranslation> list;

    public TranslationWordsCacheRepository() {
        this.list = new CopyOnWriteArrayList<>();
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return getList()
                .flatMap(Observable::fromIterable);
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
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

    @Override
    public Completable removeAll(List<WordTranslation> values) {
        return null;
    }
}
