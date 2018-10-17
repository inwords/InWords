package com.dreamproject.inwords.viewScenario.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

public interface TranslationWordsPresenter {
    void onLoadData();

    void onRemoveWordTranslation(WordTranslation wordTranslation);

    void onAddWordTranslation(WordTranslation wordTranslation);
}
