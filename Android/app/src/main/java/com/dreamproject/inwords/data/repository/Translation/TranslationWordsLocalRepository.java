package com.dreamproject.inwords.data.repository.Translation;

import android.app.Application;
import android.content.Context;
import android.util.Pair;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.database.AppRoomDatabase;
import com.dreamproject.inwords.data.source.database.WordTranslationDao;

import java.util.List;

import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsLocalRepository implements TranslationWordsRepository {
    private WordTranslationDao wordTranslationDao;

    public TranslationWordsLocalRepository(Context context) {
        AppRoomDatabase db = AppRoomDatabase.getDatabase(context);
        wordTranslationDao = db.wordTranslationDao();
    }

    @Override
    public Observable<WordTranslation> getTranslation(String word) {
        return null;
    }

    @Override
    public Observable<WordTranslation> getByOne() {
        return getList()
                .flatMap(Observable::fromIterable);
    }

    @Override
    public Observable<List<WordTranslation>> getList() {
        return wordTranslationDao.getAllWords()
                .subscribeOn(Schedulers.io())
                //.filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    @Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return Single.defer(() -> {
            long id = wordTranslationDao.insert(wordTranslation);
            wordTranslation.getWordIdentificator().setId((int) id);

            return Single.just(wordTranslation);
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordTranslation>> addAll(List<WordTranslation> wordTranslations) {
        return Observable.defer(() -> Observable.zip(
                Observable.fromIterable(wordTranslationDao.insertAll(wordTranslations)),
                Observable.fromIterable(wordTranslations),
                Pair::new
        )
                .observeOn(Schedulers.computation())
                .doOnNext((pair) -> pair.second.setId(pair.first.intValue()))
                .map((pair) -> pair.second))
                .toList()
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<WordIdentificator> remove(WordTranslation value) {
        return Single.defer(() -> {
            Thread.sleep(200);

            return Single.just(value.getWordIdentificator()); //TODO
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Single<List<WordIdentificator>> removeAll(List<WordTranslation> values) {
        return Single.defer(() -> {
            Thread.sleep(200);

            return Observable.fromIterable(values) //TODO
                    .map(WordTranslation::getWordIdentificator)
                    .toList();
        })
                .subscribeOn(Schedulers.io());
    }
}
