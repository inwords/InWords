package ru.inwords.inwords.data.repository.translation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.subjects.BehaviorSubject;
import io.reactivex.subjects.Subject;
import ru.inwords.inwords.core.util.SchedulersFacade;
import ru.inwords.inwords.data.dto.WordTranslation;

public class TranslationWordsCacheRepository implements TranslationWordsLocalRepository {
    private final ConcurrentHashMap<WordTranslation, WordTranslation> list;

    private final Subject<List<WordTranslation>> behaviorSubject;

    @Inject
    TranslationWordsCacheRepository() {
        this.list = new ConcurrentHashMap<>();

        behaviorSubject = BehaviorSubject.createDefault(Collections.list(list.elements()));
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return Observable.fromIterable(list.values())
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
                .subscribeOn(SchedulersFacade.io())
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .map(ArrayList::new);
    }

    @Override
    public Single<WordTranslation> addReplace(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            WordTranslation storedItem = list.get(wordTranslation);
            WordTranslation itemToAdd;
            if (storedItem == null){
                itemToAdd = new WordTranslation(wordTranslation.getWordForeign(), wordTranslation.getWordNative());
            } else {
                itemToAdd = wordTranslation;
            }
            list.put(itemToAdd, itemToAdd);

            return Single.just(itemToAdd)
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Single<List<WordTranslation>> addReplaceAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()){
            return Single.just(wordTranslations);
        }

        return Single.defer(() -> {
            //list.removeAll(wordTranslations);
            for (WordTranslation wordTranslation : wordTranslations) {
                list.put(wordTranslation, wordTranslation);
            }

            return Single.just(wordTranslations)
                    .doOnSuccess((o) -> publish());
        });
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        if (wordTranslations.isEmpty()){
            return Completable.complete();
        }

        return Completable.fromCallable(() -> {
            list.keySet().removeAll(wordTranslations);

            publish();

            return true;
        });
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        if (serverIds.isEmpty()){
            return Completable.complete();
        }

        return Completable.fromCallable(() -> {
            for (Integer serverId : serverIds) {
                for (Iterator<WordTranslation> it = list.values().iterator(); it.hasNext(); ) {
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
        behaviorSubject.onNext(Collections.list(list.elements()));
    }
}
