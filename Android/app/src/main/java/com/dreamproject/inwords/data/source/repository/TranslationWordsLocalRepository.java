package com.dreamproject.inwords.data.source.repository;

import android.app.Application;

import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsLocalRepository implements TranslationWordsRepository {
    private WordTranslationDao wordTranslationDao;

    public TranslationWordsLocalRepository(Application application) {
        AppRoomDatabase db = AppRoomDatabase.getDatabase(application);
        wordTranslationDao = db.wordTranslationDao();
    }

    @Override
    public Observable<List<WordTranslation>> getAll() {
        return wordTranslationDao.getAllWords()
                .subscribeOn(Schedulers.io())
                .filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    @Override
    public Completable add(WordTranslation wordTranslation) {
        return Completable.fromCallable(() -> wordTranslationDao.insert(wordTranslation))
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Completable addAll(List<WordTranslation> wordTranslations) {
        return Completable.fromCallable(() -> wordTranslationDao.insertAll(wordTranslations))
                .subscribeOn(Schedulers.io());
    }
}
