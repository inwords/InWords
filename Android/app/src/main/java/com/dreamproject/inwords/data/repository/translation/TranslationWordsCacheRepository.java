package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.BehaviorSubject;

public class TranslationWordsCacheRepository implements TranslationWordsLocalRepository {
    private Set<WordTranslation> list;

    private BehaviorSubject<Set<WordTranslation>> behaviorSubject;

    @Inject
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
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .map(ArrayList::new);
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
            //list.removeAll(wordTranslations);
            list.addAll(wordTranslations);

            return Single.just(wordTranslations)
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Completable update(WordTranslation wordTranslation) {
        return Completable.fromCallable(() -> {
            list.remove(wordTranslation); //TODO it is not right logic. Not for update but for insert with strategy replace on conflict
            list.add(wordTranslation);

            publish();

            return true;
        });
    }

    @Override
    public Completable updateAll(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> {
            list.removeAll(wordTranslations);
            list.addAll(wordTranslations);

            publish();

            return true;
        });
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> {
            list.removeAll(wordTranslations);

            publish();

            return true;
        });
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Completable.fromCallable(() -> {
            for (Integer serverId : serverIds) {
                for (Iterator<WordTranslation> it = list.iterator(); it.hasNext(); ) {
                    WordTranslation next = it.next();
                    if (next.getServerId() == serverId) {
                        it.remove();
                    }
                }
            }

            publish();

            return true;
        });
    }

    private void publish() {
        behaviorSubject.onNext(list);
    }
}
