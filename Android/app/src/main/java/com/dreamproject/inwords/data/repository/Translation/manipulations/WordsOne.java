package com.dreamproject.inwords.data.repository.Translation.manipulations;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.repository.DataManipulations;
import com.dreamproject.inwords.data.repository.Translation.TranslationWordsRepository;

import io.reactivex.Completable;
import io.reactivex.Observable;

public class WordsOne implements DataManipulations<WordTranslation> {
    private TranslationWordsRepository repository;

    public WordsOne(TranslationWordsRepository repository) {
        this.repository = repository;
    }

    @Override
    public Observable<WordTranslation> get() {
        return repository.getByOne();
    }

    @Override
    public Completable add(WordTranslation value) {
        return repository.add(value);
    }

    @Override
    public Completable remove(WordTranslation value) {
        return repository.add(value);
    }
}
