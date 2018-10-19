package com.dreamproject.inwords.data.repository.translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PullWordsAnswer;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Single;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsRemoteRepository {
    Single<List<WordIdentificator>> addAll(List<WordTranslation> wordTranslations);

    Completable removeAllServerIds(List<Integer> serverIds);

    Single<PullWordsAnswer> pullWords(List<Integer> wordTranslations);
}
