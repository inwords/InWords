package com.dreamproject.inwords.data.repository.Translation;

import android.app.Application;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.SyncController;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsMainRepository implements TranslationWordsRepository {
    //private RepositorySyncController<List<WordTranslation>> allListController;

    private TranslationWordsRepository inMemoryRepository;
    private TranslationWordsRepository localRepository;
    private TranslationWordsRepository remoteRepository;

    public TranslationWordsMainRepository(Application application) {
        inMemoryRepository = new TranslationWordsCacheRepository();
        localRepository = new TranslationWordsLocalRepository(application);
        remoteRepository = new TranslationWordsRemoteRepository();

        /*allListController = new RepositorySyncController<>(
                behaviorSubject,
                new WordsAllList(inMemoryRepository),
                new WordsAllList(localRepository),
                new WordsAllList(remoteRepository));*/

        SyncController syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);
        syncController.syncKostil();
        syncController.perf();

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
