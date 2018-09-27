package com.dreamproject.inwords.data.repository;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class RepositorySyncController<T, V> implements DataManipulations<T, V> {
    private DataManipulations<T, V> inMemoryCache;
    private DataManipulations<T, V> localRepository;
    private DataManipulations<T, V> remoteRepository;

    private BehaviorSubject<T> behaviorSubject;

    public RepositorySyncController(BehaviorSubject<T> behaviorSubject,
                                    DataManipulations<T, V> inMemoryCache,
                                    DataManipulations<T, V> localRepository,
                                    DataManipulations<T, V> remoteRepository) {
        this.behaviorSubject = behaviorSubject;

        this.inMemoryCache = inMemoryCache;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;

        this.behaviorSubject = BehaviorSubject.create();
    }

    @Override
    public Observable<T> get(V o) {
        Observable<T> memoryCachedWords = inMemoryCache.get(o);

        Observable<T> localWords = localRepository.get(o)
                .doOnNext(words -> inMemoryCache.add(words).subscribe());

        Observable<T> remoteWords = remoteRepository.get(o)
                .doOnNext(words -> {
                    localRepository.add(words).subscribe();
                    inMemoryCache.add(words).subscribe();
                });

        Observable.concat(memoryCachedWords, localWords, remoteWords) //observables start emitting one by one
                .firstElement() //take first available element and discard others
                .doOnSuccess(words -> behaviorSubject.onNext(words)) //emit element to external subscribers
                .subscribe();

        return behaviorSubject;
    }

    @Override
    public Completable add(T value) {
        /*return Completable.fromCallable(() -> {
            list.add(wordTranslation);
            subject.onNext(list);

            return true;
        });*/

        return null;
    }

    @Override
    public Completable remove(T value) {
        return null;
    }
}
