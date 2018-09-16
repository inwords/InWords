package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsRepository {
    Observable<WordTranslation> getByOne();

    Observable<List<WordTranslation>> getList();

    Completable add(WordTranslation wordTranslation);

    Completable addAll(List<WordTranslation> wordTranslations);

    Completable remove(WordTranslation wordTranslation);

    Completable removeAll(List<WordTranslation> wordTranslations);
}
