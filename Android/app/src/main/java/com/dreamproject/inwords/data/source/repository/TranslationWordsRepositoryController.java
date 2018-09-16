package com.dreamproject.inwords.data.source.repository;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.subjects.BehaviorSubject;

public class TranslationWordsRepositoryController implements TranslationWordsRepository {
    private TranslationWordsRepository inMemoryCache;
    private TranslationWordsRepository localRepository;
    private TranslationWordsRepository remoteRepository;

    private BehaviorSubject<List<WordTranslation>> behaviorSubject;

    public TranslationWordsRepositoryController(TranslationWordsRepository inMemoryCache, TranslationWordsRepository localRepository, TranslationWordsRepository remoteRepository) {
        this.inMemoryCache = inMemoryCache;
        this.localRepository = localRepository;
        this.remoteRepository = remoteRepository;

        this.behaviorSubject = BehaviorSubject.create();
    }

    @Override
    public Observable<List<WordTranslation>> getAll() {
        Observable<List<WordTranslation>> memoryCachedWords = inMemoryCache.getAll();

        Observable<List<WordTranslation>> localWords = localRepository.getAll()
                .doOnNext(words -> inMemoryCache.addAll(words).subscribe());

        Observable<List<WordTranslation>> remoteWords = remoteRepository.getAll()
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
    public Completable add(WordTranslation wordTranslation) {
        /*return Completable.fromCallable(() -> {
            list.add(wordTranslation);
            subject.onNext(list);

            return true;
        });*/

        return null;
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslation) {
        return null;
    }
}
