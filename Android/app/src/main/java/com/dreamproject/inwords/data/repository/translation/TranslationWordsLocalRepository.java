package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsLocalRepository {
    Observable<WordTranslation> getTranslation(String word);

    Observable<WordTranslation> getByOne();

    Observable<List<WordTranslation>> getList();

    Single<WordTranslation> add(WordTranslation wordTranslation);

    Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations);

    Completable update(WordTranslation wordTranslation);

    Completable updateAll(List<WordTranslation> wordTranslations);

    Completable removeAll(List<WordTranslation> wordTranslations);

    Completable removeAllServerIds(List<Integer> serverIds);
}
