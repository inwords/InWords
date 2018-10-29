package com.dreamproject.inwords.data.interactor.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface TranslationWordsInteractor {
    Observable<WordTranslation> getTranslation(String word);

    Observable<WordTranslation> getByOne();

    Observable<List<WordTranslation>> getList();

    Completable add(WordTranslation wordTranslation);

    Completable addAll(List<WordTranslation> wordTranslations);

    Completable markRemoved(WordTranslation wordTranslation);

    Completable markRemovedAll(List<WordTranslation> wordTranslations);
}
