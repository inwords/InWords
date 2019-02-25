package com.dreamproject.inwords.domain.interactor.translation;

import com.dreamproject.inwords.data.dto.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface TranslationWordsInteractor {
    Completable addReplace(WordTranslation wordTranslation);

    Completable remove(WordTranslation wordTranslation);

    Completable update(WordTranslation oldWord, WordTranslation newWord);

    Observable<List<WordTranslation>> getAllWords();
}
