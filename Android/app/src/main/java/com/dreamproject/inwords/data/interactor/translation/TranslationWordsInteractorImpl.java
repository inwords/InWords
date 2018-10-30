package com.dreamproject.inwords.data.interactor.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.Collections;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class TranslationWordsInteractorImpl implements TranslationWordsInteractor {
    // Tag used for debugging/logging
    public static final String TAG = "TranslationWordsInteractorImpl";

    private final TranslationWordsRepositoryInteractor translationWordsRepositoryInteractor;

    @Inject
    TranslationWordsInteractorImpl(final TranslationWordsRepositoryInteractor translationWordsRepositoryInteractor) {
        this.translationWordsRepositoryInteractor = translationWordsRepositoryInteractor;
    }

    @Override
    public Completable addWordTranslation(WordTranslation wordTranslation) {
        return translationWordsRepositoryInteractor.add(wordTranslation);
    }

    @Override
    public Completable removeWordTranslation(WordTranslation wordTranslation) {
        return translationWordsRepositoryInteractor.markRemoved(wordTranslation);
    }

    @Override
    public Observable<List<WordTranslation>> getAllWords() {
        return translationWordsRepositoryInteractor.getList().map(wordTranslations ->
                Observable.fromIterable(wordTranslations)
                        .filter(wordTranslation -> wordTranslation.getServerId() >= 0)
                        .toList()
                        .onErrorReturnItem(Collections.emptyList()) //TODO think
                        .blockingGet());
    }

}
