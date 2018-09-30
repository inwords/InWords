package com.dreamproject.inwords.data.repository.Translation;

import com.dreamproject.inwords.data.entity.WordIdentificator;
import com.dreamproject.inwords.data.entity.WordTranslation;
import com.dreamproject.inwords.data.sync.PresyncServerAnswer;

import java.util.List;

import io.reactivex.Completable;
import io.reactivex.Observable;
import io.reactivex.Single;

//Here any methods connected with manipulating data needed for Translation
public interface TranslationWordsRemoteRepository {
    Single<List<WordIdentificator>> addAll(List<WordTranslation> wordTranslations);

    Completable removeAllServerIds(List<Integer> serverIds);

    Observable<PresyncServerAnswer> getPresyncData(List<WordTranslation> wordTranslations);
}
