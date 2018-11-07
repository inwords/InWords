package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.entity.EntityIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.source.WebService.WebRequests;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;

import static com.dreamproject.inwords.util.WordsUtil.absList;

public class TranslationWordsWebApiRepository implements TranslationWordsRemoteRepository {
    private WebRequests webRequests;

    @Inject
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
    public Single<List<EntityIdentificator>> addAll(List<WordTranslation> wordTranslations) {
        return webRequests.insertAllWords(wordTranslations);
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Single.fromCallable(() -> absList(serverIds))
                .flatMap(serverIds1 -> webRequests.removeAllServerIds(serverIds1))
                .ignoreElement();
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations) {
        return webRequests.pullWords(wordTranslations);
    }
}
