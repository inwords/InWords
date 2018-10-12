package com.dreamproject.inwords.viewScenario.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

public interface TranslationWordsPresenter {
    void bindWordTranslationsToModel();

    void removeWordTranslation(WordTranslation wordTranslation);

    void addWordTranslation(WordTranslation wordTranslation);
}
