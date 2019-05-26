package ru.inwords.inwords.domain.interactor.translation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import ru.inwords.inwords.data.dto.WordTranslation;

public interface TranslationWordsRepositoryInteractor {
    Observable<WordTranslation> getTranslation(String word);

    Observable<WordTranslation> getByOne();

    Observable<List<WordTranslation>> getList();

    Completable add(WordTranslation wordTranslation);

    Completable addAll(List<WordTranslation> wordTranslations);

    Completable markRemoved(WordTranslation wordTranslation);

    Completable markRemovedAll(List<WordTranslation> wordTranslations);

    void clearCache();
}
