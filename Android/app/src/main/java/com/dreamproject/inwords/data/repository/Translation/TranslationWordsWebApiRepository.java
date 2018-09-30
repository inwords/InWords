package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.PresyncServerAnswer;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsWebApiRepository implements TranslationWordsRemoteRepository {
    private WebRequests webRequests;

    public TranslationWordsWebApiRepository() {
        webRequests = WebRequests.INSTANCE;
    }

    public Observable<List<WordTranslation>> getList() {
        return webRequests.getAllWords()
               // .filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    //@Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return webRequests.insertWord(wordTranslation);
    }

    @Override
    public Single<List<WordIdentificator>> addAll(List<WordTranslation> wordTranslations) {
        return webRequests.insertAllWords(wordTranslations);
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Completable.fromCallable(() -> {
            Thread.sleep(2000);

            return true;
        })
                .subscribeOn(Schedulers.io());
    }

    @Override
    public Observable<PresyncServerAnswer> getPresyncData(List<WordTranslation> wordTranslations) {
        return webRequests.getPresyncData();
    }
}
