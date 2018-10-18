package com.dreamproject.inwords.model;

import android.app.Application;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsCacheRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsDatabaseRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsLocalRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRemoteRepository;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsWebApiRepository;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.SyncController;

import java.util.Collections;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;

public class MainModelImpl implements MainModel {
    // Tag used for debugging/logging
    public static final String TAG = "MainModelImpl";

    private final TranslationWordsInteractor translationWordsInteractor;

    private final SyncController syncController;

    MainModelImpl(Application application, WebRequests webRequests) {
        final TranslationWordsLocalRepository inMemoryRepository = new TranslationWordsCacheRepository();
        final TranslationWordsLocalRepository localRepository = new TranslationWordsDatabaseRepository(application);
        final TranslationWordsRemoteRepository remoteRepository = new TranslationWordsWebApiRepository(webRequests);

        translationWordsInteractor = new TranslationWordsCacheInteractor(inMemoryRepository);

        syncController = new SyncController(inMemoryRepository, localRepository, remoteRepository);
    }

    @Override
    public Completable addWordTranslation(WordTranslation wordTranslation) {
        return translationWordsInteractor.add(wordTranslation);
    }

    @Override
    public Completable removeWordTranslation(WordTranslation wordTranslation) {
        return translationWordsInteractor.markRemoved(wordTranslation);
    }

    @Override
    public Completable presyncOnStart() {
        return syncController.presyncOnStart()
                .subscribeOn(Schedulers.io())
                .doOnError(Throwable::printStackTrace)
                .ignoreElement();
    }

    @Override
    public Completable trySyncAllReposWithCache() {
        return syncController.trySyncAllReposWithCache()
                .subscribeOn(Schedulers.io())
                .onErrorReturnItem(Collections.emptyList())
                .ignoreElements();
    }

    @Override
    public void notifyDataChanged() {
        syncController.notifyDataChanged();
    }

    @Override
    public Observable<List<WordTranslation>> getAllWords() {
        return translationWordsInteractor.getList().map(wordTranslations ->
                Observable.fromIterable(wordTranslations)
                        .filter(wordTranslation -> wordTranslation.getServerId() >= 0)
                        .toList()
                        .onErrorReturnItem(Collections.emptyList()) //TODO think
                        .blockingGet());
    }

}
