package com.dreamproject.inwords.data.interactor.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface TranslationWordsInteractor {
    Completable addWordTranslation(WordTranslation wordTranslation);

    Completable removeWordTranslation(WordTranslation wordTranslation);

    Observable<List<WordTranslation>> getAllWords();
}
