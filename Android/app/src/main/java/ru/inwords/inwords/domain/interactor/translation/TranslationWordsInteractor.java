package ru.inwords.inwords.domain.interactor.translation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import ru.inwords.inwords.data.dto.WordTranslation;

public interface TranslationWordsInteractor {
    Completable addReplace(WordTranslation wordTranslation);

    Completable remove(WordTranslation wordTranslation);

    Completable update(WordTranslation oldWord, WordTranslation newWord);

    Observable<List<WordTranslation>> getAllWords();
}
