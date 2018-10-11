package com.dreamproject.inwords.viewScenario.translation;

import android.app.Application;

import com.dreamproject.inwords.BasicPresenter;
import com.dreamproject.inwords.data.entity.WordTranslation;

public class TranslationWordsPresenterImpl extends BasicPresenter implements TranslationWordsPresenter {

    private TranslationMainView translationMainView;

    TranslationWordsPresenterImpl(Application application, TranslationMainView translationMainView) {
        super(application);

        this.translationMainView = translationMainView;
    }

    @Override
    public void loadData() {
        //model.sync(application);

        compositeDisposable.add(
                model.getAllWords()
                        .flatMapCompletable(translationMainView.getAdapter()::updateWordTranslations)
                        .subscribe(() -> {
                        }, Throwable::printStackTrace)
        );
    }

    @Override
    public void removeElement(WordTranslation wordTranslation) {

    }
}
