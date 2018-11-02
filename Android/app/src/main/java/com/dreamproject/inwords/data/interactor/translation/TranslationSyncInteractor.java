package com.dreamproject.inwords.data.interactor.translation;

import io.reactivex.Completable;

public interface TranslationSyncInteractor {
    Completable presyncOnStart();

    Completable trySyncAllReposWithCache();

    void notifyDataChanged();
}
