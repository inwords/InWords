package com.dreamproject.inwords.data.repository.Translation;

import android.app.Application;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.RepositoryController;
import com.dreamproject.inwords.data.repository.Translation.manipulations.WordsAllList;
import com.dreamproject.inwords.data.repository.Translation.manipulations.WordsOne;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsMainRepository implements TranslationWordsRepository {
    private RepositoryController<List<WordTranslation>> allListController;
    private RepositoryController<WordTranslation> oneController;

    public TranslationWordsMainRepository(Application application) {
        TranslationWordsRepository inMemoryRepository = new TranslationWordsCacheRepository();
        TranslationWordsRepository localRepository = new TranslationWordsLocalRepository(application);
        TranslationWordsRepository remoteRepository = new TranslationWordsRemoteRepository();

        allListController = new RepositoryController<>(
                new WordsAllList(inMemoryRepository),
                new WordsAllList(localRepository),
                new WordsAllList(remoteRepository));

        oneController = new RepositoryController<>(
                new WordsOne(inMemoryRepository),
                new WordsOne(localRepository),
                new WordsOne(remoteRepository));
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return oneController.get();
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return allListController.get();
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return oneController.add(wordTranslation);
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return allListController.add(wordTranslations);
    }

    @Override
    public Completable remove(WordTranslation wordTranslation) {
        return oneController.remove(wordTranslation);
    }

    @Override
    public Completable removeAll(List<WordTranslation> wordTranslations) {
        return allListController.remove(wordTranslations);
    }
}
