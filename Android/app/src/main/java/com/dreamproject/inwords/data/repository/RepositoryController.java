package com.dreamproject.inwords.data.repository;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class RepositoryController<T> implements DataManipulations<T> {
    private DataManipulations<T> inMemoryCache;
    private DataManipulations<T> localRepository;
    private DataManipulations<T> remoteRepository;

    private BehaviorSubject<T> behaviorSubject;

    public RepositoryController(DataManipulations<T> inMemoryCache,
                                DataManipulations<T> localRepository,
                                DataManipulations<T> remoteRepository) {
        this.inMemoryCache = inMemoryCache;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;

        this.behaviorSubject = BehaviorSubject.create();
    }

    @Override
    public Observable<T> get() {
        Observable<T> memoryCachedWords = inMemoryCache.get();

        Observable<T> localWords = localRepository.get()
                .doOnNext(words -> inMemoryCache.add(words).subscribe());

        Observable<T> remoteWords = remoteRepository.get()
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
