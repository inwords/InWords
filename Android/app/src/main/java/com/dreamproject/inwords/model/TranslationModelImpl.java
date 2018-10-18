package com.dreamproject.inwords.model;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsInteractor;
import com.dreamproject.inwords.data.sync.SyncController;

import java.util.Collections;
import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;

public class TranslationModelImpl implements TranslationModel {
    // Tag used for debugging/logging
    public static final String TAG = "TranslationModelImpl";

    private final TranslationWordsInteractor translationWordsInteractor;

    private final SyncController syncController;

    TranslationModelImpl(final TranslationWordsInteractor translationWordsInteractor,
                         final SyncController syncController) {

        this.translationWordsInteractor = translationWordsInteractor;

        this.syncController = syncController;
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
