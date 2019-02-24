package com.dreamproject.inwords.domain.interactor.translation;

import com.dreamproject.inwords.data.sync.TranslationSyncController;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.schedulers.Schedulers;

public class TranslationSyncInteractorImpl implements TranslationSyncInteractor {
    private TranslationSyncController syncController;

    @Inject
    TranslationSyncInteractorImpl(TranslationSyncController syncController) {
        this.syncController = syncController;
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
                .subscribeOn(Schedulers.io());
    }

    @Override
    public void notifyDataChanged() {
        syncController.notifyDataChanged();
    }
}
