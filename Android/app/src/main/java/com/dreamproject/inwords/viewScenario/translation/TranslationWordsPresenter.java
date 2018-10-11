package com.dreamproject.inwords.viewScenario.translation;

import com.dreamproject.inwords.data.entity.WordTranslation;

public interface TranslationWordsPresenter {
    void loadData();
    void removeElement(WordTranslation wordTranslation);
}
