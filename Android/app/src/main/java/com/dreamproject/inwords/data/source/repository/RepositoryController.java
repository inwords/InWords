package com.dreamproject.inwords.data.source.repository;

import com.dreamproject.inwords.data.source.DataManipulations;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class RepositoryController<T> implements DataManipulations<T> {
    private DataManipulations<T> inMemoryCache;
    private DataManipulations<T> localRepository;
    private DataManipulations<T> remoteRepository;

    private BehaviorSubject<List<T>> behaviorSubject;

    public RepositoryController(DataManipulations<T> inMemoryCache,
                                DataManipulations<T> localRepository,
                                DataManipulations<T> remoteRepository) {
        this.inMemoryCache = inMemoryCache;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;

        this.behaviorSubject = BehaviorSubject.create();
    }

    @Override
    public Observable<List<T>> get() {
        Observable<List<T>> memoryCachedWords = inMemoryCache.get();

        Observable<List<T>> localWords = localRepository.get()
                .doOnNext(words -> inMemoryCache.addAll(words).subscribe());

        Observable<List<T>> remoteWords = remoteRepository.get()
                .doOnNext(words -> {
                    localRepository.addAll(words).subscribe();
                    inMemoryCache.addAll(words).subscribe();
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
    public Completable addAll(List<T> values) {
        return null;
    }

    @Override
    public Completable remove(T value) {
        return null;
    }
}
