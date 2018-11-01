package com.dreamproject.inwords.viewScenario.translation.recycler;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;

public interface WordListOperations {
    Completable applyUpdatedWordTranslations(List<WordTranslation> wordTranslations);

    List<WordTranslation> getWordTranslations();
}
