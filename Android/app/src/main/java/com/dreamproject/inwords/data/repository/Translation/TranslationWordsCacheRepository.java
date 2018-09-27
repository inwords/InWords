package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.BehaviorSubject;

public class TranslationWordsCacheRepository implements TranslationWordsRepository {
    private Set<WordTranslation> list;

    private BehaviorSubject<Set<WordTranslation>> behaviorSubject;

    public TranslationWordsCacheRepository() {
        this.list = Collections.newSetFromMap(new ConcurrentHashMap<>());

        behaviorSubject = BehaviorSubject.createDefault(list);
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return Observable.fromIterable(list)
                .filter(wordTranslation -> wordTranslation.getWordForeign().equals(word) ||
                        wordTranslation.getWordNative().equals(word));
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return getList()
                .flatMap(Observable::fromIterable);
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return behaviorSubject
                .filter(wordTranslations -> !wordTranslations.isEmpty())
                .map(wordTranslations -> {
                    List<WordTranslation> list = new LinkedList<>();
                    list.addAll(wordTranslations);
                    return list;
                });
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return modifyingAction(() -> list.add(wordTranslation));
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return modifyingAction(() -> list.addAll(wordTranslations));
    }

    @Override
    public Completable remove(WordTranslation value) {
        return modifyingAction(() -> list.remove(value));
    }

    @Override
    public Completable removeAll(List<WordTranslation> values) {
        return modifyingAction(() -> list.removeAll(values));
    }

    private Completable modifyingAction(Action action) {
        return Completable.fromCallable(() -> {
            boolean res = action.perform();

            publish();

            return res;
        })
                .subscribeOn(Schedulers.computation());
    }

    private void publish() {
        behaviorSubject.onNext(list);
    }

    private interface Action {
        boolean perform();
    }
}
