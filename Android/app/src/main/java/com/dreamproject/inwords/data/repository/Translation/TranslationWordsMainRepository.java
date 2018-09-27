package com.dreamproject.inwords.data.repository.Translation;

import android.app.Application;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsMainRepository implements TranslationWordsRepository {
    //private RepositorySyncController<List<WordTranslation>> allListController;

    TranslationWordsRepository inMemoryRepository;
    TranslationWordsRepository localRepository;
    TranslationWordsRepository remoteRepository;

    public TranslationWordsMainRepository(Application application) {
        inMemoryRepository = new TranslationWordsCacheRepository();
        localRepository = new TranslationWordsLocalRepository(application);
        remoteRepository = new TranslationWordsRemoteRepository();

        /*allListController = new RepositorySyncController<>(
                behaviorSubject,
                new WordsAllList(inMemoryRepository),
                new WordsAllList(localRepository),
                new WordsAllList(remoteRepository));*/


        //Один большой костыль для синхронизаци

        Disposable d = Observable.zip(remoteRepository.getList(), localRepository.getList(), (listRemote, listLocal) -> {
            localRepository.addAll(listRemote)
                    .subscribe();
            remoteRepository.addAll(listLocal)
                    .subscribe();

            listLocal.addAll(listRemote);
            inMemoryRepository.addAll(listLocal)
                    .subscribe();

            return listLocal;
        })
                .subscribeOn(Schedulers.io())
                .subscribe((wordTranslations) -> {
                }, Throwable::printStackTrace);

    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return inMemoryRepository.getTranslation(word);
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return inMemoryRepository.getByOne();
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return inMemoryRepository.getList();
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return inMemoryRepository.add(wordTranslation);
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return inMemoryRepository.addAll(wordTranslations);
    }

    @Override
    public Completable remove(WordTranslation wordTranslation) {
        return inMemoryRepository.remove(wordTranslation);
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        return inMemoryRepository.removeAll(wordTranslations);
    }
}
