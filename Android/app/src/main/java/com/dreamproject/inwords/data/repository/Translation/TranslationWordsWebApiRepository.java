package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import io.reactivex.schedulers.Schedulers;

public class TranslationWordsWebApiRepository implements TranslationWordsRemoteRepository {
    private WebRequests webRequests;

    public TranslationWordsWebApiRepository(WebRequests webRequests) {
        this.webRequests = webRequests;
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
        return webRequests.removeAllServerIds(serverIds);
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations) {
        return webRequests.pullWords(wordTranslations);
    }
}
