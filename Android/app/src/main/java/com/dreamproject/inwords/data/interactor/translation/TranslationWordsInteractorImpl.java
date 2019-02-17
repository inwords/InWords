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

    private final TranslationWordsRepositoryInteractor repositoryInteractor;

    private final Observable<List<WordTranslation>> wordsStream;

    @Inject
    TranslationWordsInteractorImpl(final TranslationWordsRepositoryInteractor repositoryInteractor) {
        this.repositoryInteractor = repositoryInteractor;

        this.wordsStream = repositoryInteractor.getList().map(wordTranslations ->
                Observable.fromIterable(wordTranslations)
                        .filter(wordTranslation -> wordTranslation.getServerId() >= 0)
                        .toList()
                        .onErrorReturnItem(Collections.emptyList()) //TODO think
                        .blockingGet())
                .share()
                .replay(1)
                .autoConnect();
    }

    @Override
    public Completable addReplace(WordTranslation wordTranslation) {
        return repositoryInteractor.add(wordTranslation);
    }

    @Override
    public Completable remove(WordTranslation wordTranslation) {
        return repositoryInteractor.markRemoved(wordTranslation);
    }

    @Override
    public Completable update(WordTranslation oldWord, WordTranslation newWord) {
        return Completable.concatArray(remove(oldWord), addReplace(newWord));
    }

    @Override
    public Observable<List<WordTranslation>> getAllWords() {
        return wordsStream;
    }

}
