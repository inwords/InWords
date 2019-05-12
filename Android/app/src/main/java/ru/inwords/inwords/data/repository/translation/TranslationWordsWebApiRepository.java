package ru.inwords.inwords.data.repository.translation;

import java.util.List;

import javax.inject.Inject;

import io.reactivex.Completable;
import io.reactivex.Single;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.source.webService.WebRequestsManager;
import ru.inwords.inwords.data.sync.PullWordsAnswer;
import ru.inwords.inwords.domain.util.WordsUtilKt;

public class TranslationWordsWebApiRepository implements TranslationWordsRemoteRepository {
    private final WebRequestsManager webRequestsManager;

    @Inject
    public TranslationWordsWebApiRepository(WebRequestsManager webRequestsManager) {
        this.webRequestsManager = webRequestsManager;
    }

    @Override
    public Single<List<EntityIdentificator>> addAll(List<WordTranslation> wordTranslations) {
        return webRequestsManager.insertAllWords(wordTranslations);
    }

    @Override
    public Completable removeAllServerIds(List<Integer> serverIds) {
        return Single.fromCallable(() -> WordsUtilKt.absList(serverIds))
                .flatMap(webRequestsManager::removeAllServerIds)
                .ignoreElement();
    }

    @Override
    public Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations) {
        return webRequestsManager.pullWords(wordTranslations);
    }
}
