package com.dreamproject.inwords.model;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface MainModel {
    Completable presyncOnStart();

    Completable addWordTranslation(WordTranslation wordTranslation);

    Completable removeWordTranslation(WordTranslation wordTranslation);

    Completable trySyncAllReposWithCache();

    void notifyDataChanged();

    Observable<List<WordTranslation>> getAllWords();
}
