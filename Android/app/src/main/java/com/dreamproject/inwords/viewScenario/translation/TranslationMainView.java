package com.dreamproject.inwords.viewScenario.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

import java.util.List;

import io.reactivex.Completable;

public interface TranslationMainView {
    Completable updateWordTranslations(List<WordTranslation> wordTranslations);
    List<WordTranslation> getWordTranslations();
}
