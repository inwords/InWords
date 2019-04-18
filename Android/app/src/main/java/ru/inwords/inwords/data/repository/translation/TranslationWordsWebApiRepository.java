package ru.inwords.inwords.data.repository.translation;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.source.webService.WebRequestsManager;
import ru.inwords.inwords.data.sync.PullWordsAnswer;
import ru.inwords.inwords.domain.util.WordsUtilKt;

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
