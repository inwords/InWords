package ru.inwords.inwords.data.repository.translation;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Single;
import ru.inwords.inwords.data.dto.EntityIdentificator;
import ru.inwords.inwords.data.dto.WordTranslation;
import ru.inwords.inwords.data.sync.PullWordsAnswer;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsRemoteRepository {
    Single<List<EntityIdentificator>> addAll(List<WordTranslation> wordTranslations);

    Completable removeAllServerIds(List<Integer> serverIds);

    Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations);
}
