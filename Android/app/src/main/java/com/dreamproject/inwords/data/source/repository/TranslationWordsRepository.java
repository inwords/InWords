package com.dreamproject.inwords.data.source.repository;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public interface TranslationWordsRepository {
    Observable<List<WordTranslation>> getAll();
    Completable add(WordTranslation wordTranslation);
    Completable addAll(List<WordTranslation> wordTranslation);
}
