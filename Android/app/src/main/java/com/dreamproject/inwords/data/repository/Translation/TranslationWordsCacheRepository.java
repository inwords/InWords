package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import io.reactivex.Observable;
import io.reactivex.Single;
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
                .subscribeOn(Schedulers.computation())
                .filter(wordTranslations -> !wordTranslations.isEmpty())
                .map(wordTranslations -> {
                    List<WordTranslation> list = new LinkedList<>();
                    list.addAll(wordTranslations);
                    return list;
                });
    }

    @Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            list.add(wordTranslation);

            return Single.just(wordTranslation)
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations) {
        return Single.defer(() -> {
            list.addAll(wordTranslations);

            return Single.just(wordTranslations)
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Single<WordIdentificator> remove(WordTranslation value) {
        return Single.defer(() -> {
            list.remove(value);

            return Single.just(value.getWordIdentificator())
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Single<List<WordIdentificator>> removeAll(List<WordTranslation> values) {
        return Single.defer(() -> {
            list.removeAll(values);

            return Single.just(values)
                    .flatMap(wordTranslations -> Observable.fromIterable(wordTranslations)
                            .map(WordTranslation::getWordIdentificator)
                            .toList())
                    .doOnSuccess((o) -> publish());
        });
    }

    private void publish() {
        behaviorSubject.onNext(list);
    }
}
