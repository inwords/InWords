package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.dto.EntityIdentificator;
import com.dreamproject.inwords.data.dto.WordTranslation;
import com.dreamproject.inwords.data.source.webService.WebRequestsManager;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;
import com.dreamproject.inwords.domain.util.WordsUtilKt;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;

public class TranslationWordsWebApiRepository implements TranslationWordsRemoteRepository {
    private WebRequestsManager webRequestsManager;

    @Inject
    public TranslationWordsWebApiRepository(WebRequestsManager webRequestsManager) {
        this.webRequestsManager = webRequestsManager;
    }

    public Observable<List<WordTranslation>> getList() {
        return webRequestsManager.getAllWords()
                // .filter(wordTranslations -> !wordTranslations.isEmpty())
                .toObservable();
    }

    //@Override
    public Single<WordTranslation> add(WordTranslation wordTranslation) {
        return webRequestsManager.insertWord(wordTranslation);
    }

    @Override
    public Single<List<EntityIdentificator>> addAll(List<WordTranslation> wordTranslations) {
        return webRequestsManager.insertAllWords(wordTranslations);
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Single.fromCallable(() -> WordsUtilKt.absList(serverIds))
                .flatMap(serverIds1 -> webRequestsManager.removeAllServerIds(serverIds1))
                .ignoreElement();
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations) {
        return webRequestsManager.pullWords(wordTranslations);
    }
}
