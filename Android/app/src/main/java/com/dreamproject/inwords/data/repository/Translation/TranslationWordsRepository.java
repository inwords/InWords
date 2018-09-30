package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsRepository {
    Observable<WordTranslation> getTranslation(String word);

    Observable<WordTranslation> getByOne();

    Observable<List<WordTranslation>> getList();

    Single<WordTranslation> add(WordTranslation wordTranslation);

    Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations);

    Single<WordIdentificator> remove(WordTranslation wordTranslation);

    Single<List<WordIdentificator>> removeAll(List<WordTranslation> wordTranslations);
}
