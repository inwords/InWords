package com.dreamproject.inwords.data.repository.Translation.manipulations;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.DataManipulations;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class WordsAllList implements DataManipulations<List<WordTranslation>, Object> {
    private TranslationWordsRepository repository;

    public WordsAllList(TranslationWordsRepository repository) {
        this.repository = repository;
    }

    @Override
    public Observable<List<WordTranslation>> get(Object o) {
        return repository.getList();
    }

    @Override
    public Completable add(List<WordTranslation> value) {
        return repository.addAll(value);
    }

    @Override
    public Completable remove(List<WordTranslation> value) {
        return repository.removeAll(value);
    }

}
